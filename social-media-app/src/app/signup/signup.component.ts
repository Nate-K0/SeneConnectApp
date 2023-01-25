import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../User';

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

  constructor(private _userService : UserService, private _router : Router) {  }

  ngOnInit(): void {
  }

  formSubmit(): void {
      this.newUserSub = this._userService.newUser(this.user).subscribe(
        (message) => {
        // console.log(message);
        this._router.navigate(['/login']);
      },
      (error) => {
        this.warning = error.error.message;
      });
  }

  ngOnDestroy() {
    if (this.newUserSub) this.newUserSub.unsubscribe();
  }
}
