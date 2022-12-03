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
    var formData: any = new FormData();
    formData.append('username', this.form.get('username')?.value);

    this._searchService.getUserByUserName(formData).subscribe({
      next: (response) => {
        this.router.navigate(['/search']);
        console.log(formData);
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  handleLogout(): void {
    this.token = null;
    this._authService.deleteToken();
  }
}
