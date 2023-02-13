import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../Post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-adminposts',
  templateUrl: './adminposts.component.html',
  styleUrls: ['./adminposts.component.css']
})
export class AdminpostsComponent implements OnInit {
  allPosts: Array<Post> = [];
  psts: any;

  constructor(private _postService: PostService, private router : Router) { }

  ngOnInit(): void {
    this.psts = this._postService.getAllPosts().subscribe(post => {
      this.allPosts = post;
    })
  }

  handleDelete(id:string) : void {
    this.psts = this._postService.deletePostById(id).subscribe(() => this.router.navigate(['/admin/posts']))
  }

  ngOnDestroy(): void {
    if (this.psts) this.psts.unsubscribe();
  }
}
