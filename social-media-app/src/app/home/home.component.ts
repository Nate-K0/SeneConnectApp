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
  psts: any;
  username !: string;

  constructor(private _postService : PostService, private router : Router, private _authService : AuthService) {
  }

  ngOnInit(): void {
    this._postService.getAllPosts().subscribe(post => {
      if (post.length > 0) {
        this.posts = post;
      }
    });

    this.username = this._authService.getUsername()!;
  }

  handleDelete(id : string) : void {
    this.psts = this._postService.deletePostById(id).subscribe(() => this.router.navigate(['/home']))
  }

  ngOnDestroy(): void {
    if (this.psts) this.psts.unsubscribe();
  }
}
