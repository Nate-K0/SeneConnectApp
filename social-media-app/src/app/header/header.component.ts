import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, Event, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public token: any;
  isAdminLoggedIn!: boolean;

  constructor(private _authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.token = this._authService.readToken();
        this.isAdminLoggedIn = this._authService.isAdmin();
      }
    });
  }

  handleLogout(): void {
    this.token = null;
    this._authService.deleteToken();
  }

}
