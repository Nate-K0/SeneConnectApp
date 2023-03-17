import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Profile } from '../Profile';
import { UserService } from '../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Input() profile : Profile = new Profile();
  prfl: any;
  username !: string;

  constructor(private _userService: UserService, private _authService: AuthService, private router : Router, private _location: Location) { }

  ngOnInit(): void {
    this.username = this._authService.getUsername()!;

    this.prfl = this._userService.getProfileByUsername(this.username).subscribe(profile => {
      if (profile != null) {
        this.profile = profile;
      }
    });
  }

  confirmEdit() : void {
    this.prfl = this._userService.updateProfileById(this.profile._id, this.profile).subscribe(() => this.router.navigate(['/profile']));
  }

  ngOnDestroy() : void {
    if (this.prfl) this.prfl.unsubscribe();
  }

  goBack() {
    this._location.back();
  }
}
