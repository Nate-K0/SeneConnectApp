import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Post } from '../Post';
import { PostService } from '../post.service';
import { Comment } from '../Comment';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  post: Post = new Post();
  comment !: Comment;
  comSub : any;
  commentText!: string;
  username !: string;

  constructor(private _postService : PostService, private route : ActivatedRoute, private _authService : AuthService) { }

  ngOnInit(): void {
    this.comSub = this.route.params.subscribe(params =>{
      this._postService.getPostbyId(params['id']).subscribe(pst => {
        if (pst != null) {
          this.post = pst;
        }
      })
    })

    this.username = this._authService.getUsername()!;
  }

  newComment() : void {
    if (this.commentText.length == 0) {
      return;
    }

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

  handleDeleteComment(comment : Comment) : void {
    var idx : number = this.post.comments.indexOf(comment);
    delete this.post.comments[idx];

    this._postService.updatePostById(this.post._id, this.post).subscribe(() => {
      this.commentText = "";
    });
  }

  ngOnDestroy(): void {
    if (this.comSub) this.comSub.unsubscribe();
  }

}