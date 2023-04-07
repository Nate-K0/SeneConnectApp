import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Post } from '../Post';
import { PostService } from '../post.service';
import { Profile } from '../Profile';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile !: Profile;
  prfl: any;
  username !: string;
  profilesUsername !: string;
  posts !: Array<Post>;
  post !: Post;
  psts: any;

  constructor(private _userService: UserService, private _authService: AuthService, private router : Router, private route : ActivatedRoute, private _postService: PostService) {
    router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    this.username = this._authService.getUsername()!;

    this.prfl = this.route.params.subscribe(params =>{
      this._userService.getProfileByUsername(params['username']).subscribe(prf => {
        if (prf != null) {
          this.profile = prf;
          this.profilesUsername = this.profile.userName;
        }
      })
    });

    this._postService.getAllPosts().subscribe(posts => {
      if (posts.length > 0) {
        this.posts = posts;
      }
    });
  }

  handleFollow() : void {
    this.profile.followedBy.push(this.username);
    this.profile.followers = this.profile.followers + 1!;

    // kills all null in the array
    const nonNullLikes = this.profile.followedBy.filter((element) => element !== null);
    this.profile.followedBy = nonNullLikes;

    this.prfl = this._userService.updateProfileById(this.profile._id, this.profile).subscribe(() => this.router.navigate(['/profile', this.profile.userName]));
  }

  handleUnFollow() : void {
    if (this.profile.followers < 1) {
      this.profile.followers = 0;
    } else {
      this.profile.followers -= 1;
    }

    var idx : number = this.profile.followedBy.indexOf(this.username);
    delete this.profile.followedBy[idx];
    
    // kills all null in the array
    const nonNullLikes = this.profile.followedBy.filter((element) => element !== null);
    this.profile.followedBy = nonNullLikes;

    this.prfl = this._userService.updateProfileById(this.profile._id, this.profile).subscribe(() => this.router.navigate(['/profile', this.profile.userName]));
  }

  addComment(id: string): void {
    this.router.navigate(['/comment', id]);
  }

  handleLike(id: string): void {
    this._postService.getPostbyId(id).subscribe(data => {
      if (data != null) {
        this.post = data;

        if (this.post.likedBy.length == 0) {
          this.likePost(id);
        } else {
          if (this.post.likedBy.includes(this.username)) {
            this.unlikePost(id);
          } else {
            this.likePost(id);
          }
        }
      }
    });
  }

  likePost(id: string): void {
    this.post.likedBy.push(this.username);
    this.post.likes += 1;

    // kills all null in the array
    const nonNullLikes = this.post.likedBy.filter((element) => element !== null);
    this.post.likedBy = nonNullLikes;

    // Find the index of the post in the posts array
    const index = this.posts.findIndex(p => p._id === id);

    // Update the post in the posts array
    if (index !== -1) {
      this.posts[index] = { ...this.post };
    }   
    
    this.updatePost(id, this.post);
  }

  unlikePost(id: string): void {
    if (this.post.likes < 1) {
      this.post.likes = 0;
    } else {
      this.post.likes -= 1;
    }

    // kills the null from this use
    var idx: number = this.post.likedBy.indexOf(this.username);
    delete this.post.likedBy[idx];
    
    // kills all null in the array
    const nonNullLikes = this.post.likedBy.filter((element) => element !== null);
    this.post.likedBy = nonNullLikes;

    // Find the index of the post in the posts array
    const index = this.posts.findIndex(p => p._id === id);

    // Update the post in the posts array
    if (index !== -1) {
      this.posts[index] = { ...this.post };
    }

    this.updatePost(id, this.post);
  }

  updatePost(id: string, post: Post): void {
    this.psts = this._postService.updatePostById(id, post).subscribe((message) => {
      //this.router.navigate(['/home']); // Refresh unneeded
    });
  }

  handleDelete(id: string): void {
    this.psts = this._postService.deletePostById(id).subscribe(() => {
      this.router.navigate(['/home'])
    })
  }

  ngOnDestroy() : void {
    if (this.prfl) this.prfl.unsubscribe();
    if (this.psts) this.psts.unsubscribe();
  }
}