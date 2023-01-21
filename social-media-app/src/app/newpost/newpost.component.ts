import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { Post } from '../Post';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {
  post: Post = new Post();
  psts: any;

  constructor(private _postService : PostService, private _router : Router, private _authService: AuthService) { }

  ngOnInit(): void {
    
  }

  formSubmit(): void {
    this.post.postDate = new Date().toLocaleDateString();
    this.post.postedBy = this._authService.getUsername()!;
    this.post.likes = 0;
    this.post.comments = [];
    this.post.likedBy = [];
    
    this.psts = this._postService.newPost(this.post).subscribe(() => this._router.navigate(['/home']));
  }

  ngOnDestroy() {
    if (this.psts) this.psts.unsubscribe();
  }
}
