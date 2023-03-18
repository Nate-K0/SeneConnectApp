import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Profile } from '../Profile';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile !: Profile;
  prfl: any;
  username !: string;

  constructor(private _userService: UserService, private _authService: AuthService, private router : Router, private route : ActivatedRoute) {
    router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    this.username = this._authService.getUsername()!;

    this.prfl = this.route.params.subscribe(params =>{
      this._userService.getProfileByUsername(params['username']).subscribe(prf => {
        if (prf != null) {
          this.profile = prf;
        }
      })
    })
  }

  handleFollow() : void {
    this.profile.followedBy.push(this.username);
    this.profile.followers = this.profile.followers + 1!;

    this.prfl = this._userService.updateProfileById(this.profile._id, this.profile).subscribe(() => this.router.navigate(['/profile', this.profile.userName]));
  }

  handleUnFollow() : void {
    if (this.profile.followers < 1) {
      this.profile.followers = 0;
    } else {
      this.profile.followers -= 1;
    }

    var idx : number = this.profile.followedBy.indexOf(this.username);
    delete this.profile.followedBy[idx];

    this.prfl = this._userService.updateProfileById(this.profile._id, this.profile).subscribe(() => this.router.navigate(['/profile', this.profile.userName]));
  }

  ngOnDestroy() : void {
    if (this.prfl) this.prfl.unsubscribe();
  }

}
