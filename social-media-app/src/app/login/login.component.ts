import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user:User = new User();
  public warning:string = "";
  loginUserSub: any;

  constructor(private _authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  handleLogin(form: NgForm): void {
    this.loginUserSub = this._authService.login(this.user).subscribe(
      (message) => {
        this._authService.setToken(message.token);
        this._authService.setUsername(message.username);
        if (message.isAdmin) {
          this._authService.setIsAdmin("yes");
          this.router.navigate(['/admin/users']);
        } else {
          this._authService.setIsAdmin("no");
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        if (error.error.message == "{}") {
          this.warning = "API Booting up, try again";
        } else {
          this.warning = error.error.message.replace(/['"]+/g, '');
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.loginUserSub) this.loginUserSub.unsubscribe();
  }
}
