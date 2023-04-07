import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router';

@Component({
  selector: 'app-followers-dialog',
  templateUrl: './followers-dialog.component.html',
  styleUrls: ['./followers-dialog.component.css']
})
export class FollowersDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {followers: string[]}, public dialogRef: MatDialogRef<FollowersDialogComponent>,  private router : Router) { }

  viewProfile(username: string): void {
    this.router.navigate(['/profile', username]);
    this.dialogRef.close();
  }
}
