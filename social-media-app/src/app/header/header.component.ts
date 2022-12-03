import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, Event, NavigationStart } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public token: any;
  isAdminLoggedIn!: boolean;
  usrs: any;

  constructor(private _authService: AuthService, private router: Router, private _searchService: SearchService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.token = this._authService.readToken();
        this.isAdminLoggedIn = this._authService.isAdmin();
      }
    });
  }

  handleSearch(form: NgForm): void {
    this.usrs = this._searchService.getUserByUserName(form.value).subscribe(user => {
      console.log("User: " + user);
      this.router.navigate(['/search']);
    })
  }

  handleLogout(): void {
    this.token = null;
    this._authService.deleteToken();
  }

  ngOnDestroy(): void {
    if (this.usrs) this.usrs.unsubscribe();
  }
}
