import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, Event, NavigationStart } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public token: any;
  isAdminLoggedIn!: boolean;
  public usr: any;
  searchForm: FormGroup | undefined;

  constructor(private _authService: AuthService, private router: Router, private _searchService: SearchService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.token = this._authService.readToken();
        this.isAdminLoggedIn = this._authService.isAdmin();
      }
    });
  }

  handleSearch(searchForm: NgForm): void {
    this.usr = this._searchService.getUserByUserName(searchForm.value).subscribe(user => {
      // TODO fix form input value not working
      console.log("Input: " + searchForm.value);
      console.log("User: " + user.userName);
      this.router.navigate(['/search']);
    })
  }

  handleLogout(): void {
    this.token = null;
    this._authService.deleteToken();
  }

  ngOnDestroy(): void {
    if (this.usr) this.usr.unsubscribe();
  }
}
