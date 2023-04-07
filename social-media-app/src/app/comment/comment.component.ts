import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Post } from '../Post';
import { PostService } from '../post.service';
import { Comment } from '../Comment';
import { Location } from '@angular/common';
import { format } from 'date-fns';

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

  constructor(private _postService : PostService, private route : ActivatedRoute, private _authService : AuthService, private _location: Location) { }

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
        date: format(new Date(), "MMMM dd, yyyy HH:mm:ss zzz")
      }
    );

    this._postService.updatePostById(this.post._id, this.post).subscribe(() => {
      this.commentText = "";
    });
  }

  handleDeleteComment(comment : Comment) : void {
    comment.comment = "<deleted>";

    var idx : number = this.post.comments.indexOf(comment);
    this.post.comments[idx] = comment;

    this._postService.updatePostById(this.post._id, this.post).subscribe(() => {
      this.commentText = "";
    });
  }

  handleReplyComment(comment : Comment) : void {
    var cutComment = "";

    if (comment.comment.length >= 10) {
      cutComment = comment.comment.substring(0,10);
    } else {
      cutComment = comment.comment;
    }

    this.commentText = "Replying to " + comment.author + " from " + comment.date + " > " + cutComment + " :   ";
  }

  goBack() {
    this._location.back();
  }

  ngOnDestroy(): void {
    if (this.comSub) this.comSub.unsubscribe();
  }
}
