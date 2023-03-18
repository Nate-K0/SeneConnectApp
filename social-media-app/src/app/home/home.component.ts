import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Post } from '../Post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts !: Array<Post>;
  post !: Post;
  psts: any;
  username !: string;
  windowScrolled = false;

  constructor(private _postService: PostService, private router: Router, private _authService: AuthService) {
    router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this._postService.getAllPosts().subscribe(post => {
      if (post.length > 0) {
        this.posts = post;
      }
    });

    this.username = this._authService.getUsername()!;

    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  viewProfile(username: string): void {
    if (this.username == username) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/profile', username]);
    }
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

  ngOnDestroy(): void {
    if (this.psts) this.psts.unsubscribe();
  }
}