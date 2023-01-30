import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Profile } from '../Profile';
import { UserService } from '../user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  profile !: Profile;
  prfl: any;
  username !: string;

  constructor(private _userService: UserService, private _authService: AuthService) { }

  ngOnInit(): void {
    this.username = this._authService.getUsername()!;

    this._userService.getProfileByUsername(this.username).subscribe(profile => {
      if (profile != null) {
        this.profile = profile;
      }
    });
  }

}
