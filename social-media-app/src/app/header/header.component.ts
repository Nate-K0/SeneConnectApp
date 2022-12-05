import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, Event, NavigationStart } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from '../search.service';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public token: any;
  isAdminLoggedIn!: boolean;
  form: FormGroup;
 
  constructor(public fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private _searchService: SearchService) {
    this.form = this.fb.group({
      username: ['']
    });
  }
 
  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.token = this._authService.readToken();
        this.isAdminLoggedIn = this._authService.isAdmin();
      }
    });
  }
 
  handleSearch(): void {
    var username = this.form.get('username')!.value;
 
    this._searchService.getUserByUserName(username).subscribe((response) => {
      var res = JSON.stringify(response);
 
      if (res != null) {
        this._searchService.setLatestData(res);
      } else {
        this._searchService.setLatestData(null);
      }
    });
 
    this.form.reset();
    this.router.navigate(['/search']);
  }
 
  handleLogout(): void {
    this.token = null;
    this._authService.deleteToken();
  }
}