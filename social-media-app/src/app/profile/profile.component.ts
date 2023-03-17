import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Profile } from '../Profile';
import { UserService } from '../user.service';
import { Post } from '../Post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile !: Profile;
  prfl: any;
  username !: string;
  posts !: Array<Post>;
  post !: Post;
  windowScrolled = false;
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
        }
      })

      this._postService.getAllPostsByUser(params['username']).subscribe(post => {
        if (post.length > 0) {
          this.posts = post;
        }
      });
    })

    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  viewProfile(username: string) : void {
    if (this.username == username) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/profile', username]);
    }
  }

  addComment(id: string) : void {
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
      this.updatePost(id, this.post);
  }

  unlikePost(id: string): void {
      if (this.post.likes < 1) {
        this.post.likes = 0;
      } else {
        this.post.likes -= 1;
      }

      var idx : number = this.post.likedBy.indexOf(this.username);
      delete this.post.likedBy[idx];
      this.updatePost(id, this.post);
  }

  updatePost(id: string, post: Post): void {
    this.psts = this._postService.updatePostById(id, post).subscribe((message) => {
      this.router.navigate(['/home']);
    });
  }

  handleDelete(id: string): void {
    this.psts = this._postService.deletePostById(id).subscribe(() => {
      this.router.navigate(['/home'])
    })
  }

  handleFollow() : void {
    this.profile.followedBy.push(this.username);
    this.profile.followers = this.profile.followers + 1!;

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

    this.prfl = this._userService.updateProfileById(this.profile._id, this.profile).subscribe(() => this.router.navigate(['/profile', this.profile.userName]));
  }

  ngOnDestroy() : void {
    if (this.prfl) this.prfl.unsubscribe();
    if (this.psts) this.psts.unsubscribe();
  }

}
