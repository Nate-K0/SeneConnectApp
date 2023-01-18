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

  constructor(private _postService: PostService, private router: Router, private _authService: AuthService) {
  }

  ngOnInit(): void {
    this._postService.getAllPosts().subscribe(post => {
      if (post.length > 0) {
        this.posts = post;
      }
    });

    this.username = this._authService.getUsername()!;
  }

  addComment(id: string) : void {

  }

  handleLike(id: string): void {
    this._postService.getPostbyId(id).subscribe(data => {
      if (data != null) {
        this.post = data;
        console.log("Response: " + JSON.stringify(this.post));

        if (this.post.likedBy.includes(this.username)) {
          this.unlikePost(id);
        } else {
          this.likePost(id);
        }
      }
    });
  }

  likePost(id: string): void {
    this._postService.likePostById(id, this.username).subscribe(() => {
      this.updatePost(id,  this.post.likedBy.push(this.username));
      this.post.likedBy.push(this.username);
    });
  }

  unlikePost(id: string): void {
    this._postService.unlikePostById(id, this.username).subscribe(() => {
      if (this.post.likes < 1) {
        this.post.likes = 0;
      } else {
        this.post.likes -= 1;
      }

      this.post.likedBy.pop();
    });
  }

  updatePost(id: string, postLikes: any): void {
    this._postService.updatePostById(id, postLikes).subscribe(() => {
    });
  }

  handleDelete(id: string): void {
    this.psts = this._postService.deletePostById(id).subscribe(() => this.router.navigate(['/home']))
  }

  ngOnDestroy(): void {
    if (this.psts) this.psts.unsubscribe();
  }
}
