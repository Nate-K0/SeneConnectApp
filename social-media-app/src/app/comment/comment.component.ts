import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private _postService : PostService, private route : ActivatedRoute, private _authService : AuthService, private _location: Location, private router : Router) { }

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


    if (comment.comment.includes('Replying to ') == true) {
      var splitIndex = comment.comment.lastIndexOf(':');
      cutComment = comment.comment.substring(splitIndex, comment.comment.length);
      cutComment.replace("[\\t\\n\\r]+\g", '');
    } else {
      cutComment = comment.comment;
    }
    var dateToString = Date.parse(comment.date);
    var fullDate = format(dateToString, "MMMM dd, yyyy HH:mm:ss zzz");

    this.commentText = "Replying to " + comment.author + " from " + fullDate + " : " + cutComment + " >\n\n";
  }

  viewProfile(username: string): void {
    if (this.username == username) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/profile', username]);
    }
  }

  goBack() {
    this._location.back();
  }

  ngOnDestroy(): void {
    if (this.comSub) this.comSub.unsubscribe();
  }
}
