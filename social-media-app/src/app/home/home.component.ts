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

        if (this.post.likedBy.includes(this.username)) {
          this.unlikePost(id);
        } else {
          this.likePost(id);
        }
      }
    });
  }

  likePost(id: string): void {
    // this._postService.likePostById(id, this.username).subscribe(() => {
      this.post.likedBy.push(this.username);
      this.post.likes += 1;
      console.log(this.post.likedBy.toLocaleString() + this.post.likes.toLocaleString());
      this.updatePost(id, this.post);
    // });
  }

  unlikePost(id: string): void {
    // this._postService.unlikePostById(id, this.username).subscribe(() => {
      if (this.post.likes < 1) {
        this.post.likes = 0;
      } else {
        this.post.likes -= 1;
      }

      var idx : number = this.post.likedBy.indexOf(this.username);
      delete this.post.likedBy[idx];
      // this.post.likedBy.pop();
      console.log(this.post.likedBy.toLocaleString() + this.post.likes.toLocaleString());
      this.updatePost(id, this.post);
    // });
  }

  updatePost(id: string, post: Post): void {
    this.psts = this._postService.updatePostById(id, post).subscribe(() => this.router.navigate(['/home']));
  }

  handleDelete(id: string): void {
    this.psts = this._postService.deletePostById(id).subscribe(() => this.router.navigate(['/home']))
  }

  ngOnDestroy(): void {
    if (this.psts) this.psts.unsubscribe();
  }
}
