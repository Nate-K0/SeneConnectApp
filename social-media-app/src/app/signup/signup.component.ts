import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../User';
import { Profile } from '../Profile';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = new User();
  tags!: string;
  newUserSub: any;
  public warning:string = "";
  profile: Profile = new Profile();

  constructor(private _userService : UserService, private _router : Router) {  }

  ngOnInit(): void {
  }

  formSubmit(): void {
      this.user.userName = this.user.userName.toLowerCase();
      
      this.newUserSub = this._userService.newUser(this.user).subscribe(
      (message) => {
        if (this.user.userName != "Admin") {
          this.profile.userName = this.user.userName;
          this.profile.profilePic = "https://play.teleporthq.io/static/svg/default-img.svg";
          this.profile.bio = "Template BIO";
          this.profile.followers = 0;
          this.profile.followedBy = [];
          this.profile.following = [];

          this.newUserSub = this._userService.newProfile(this.profile).subscribe(
            (mess) => {
              this._router.navigate(['/login']);
            },
            (err) => {
              this.warning = err.error.message;
            });
        } else {
          this._router.navigate(['/login']);
        }
      },
      (error) => {
        this.warning = error.error.message;
      });
  }

  ngOnDestroy() {
    if (this.newUserSub) this.newUserSub.unsubscribe();
  }
}
