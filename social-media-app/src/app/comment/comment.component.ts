import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Post } from '../Post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  post: Post = new Post();
  comSub : any;
  commentText!: string;

  constructor(private _postService : PostService, private route : ActivatedRoute, private _authService : AuthService) { }

  ngOnInit(): void {
    this.comSub = this.route.params.subscribe(params =>{
      this._postService.getPostbyId(params['id']).subscribe(pst => {
        if (pst != null) {
          this.post = pst;
        }
      })
    })
  }

  newComment() : void {
    this.post?.comments.push(
      {
        author: this._authService.getUsername()!,
        comment: this.commentText,
        date: new Date().toLocaleDateString()
      }
    );

    this._postService.updatePostById(this.post._id, this.post).subscribe(() => {
      this.commentText = "";
    });
  }

  ngOnDestroy(): void {
    if (this.comSub) this.comSub.unsubscribe();
  }

}