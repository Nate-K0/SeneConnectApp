import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { Post } from '../Post';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {
  post: Post = new Post();
  psts: any;

  constructor(private _postService : PostService, private _router : Router) { }

  ngOnInit(): void {
    
  }

  formSubmit(): void {
    this.psts.postDate = new Date().toLocaleDateString();
    this.psts.postedBy = "BTI425 Student";
    this.psts.likes = 0;
    
    this.psts = this._postService.newPost(this.post).subscribe(() => this._router.navigate(['/home']));
  }

  ngOnDestroy() {
    if (this.psts) this.psts.unsubscribe();
  }
}
