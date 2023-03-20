import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  user: any;
  username !: string;

  constructor(private _searchService: SearchService, private router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
    this._searchService.data.subscribe((data) => {
      if (data != null) {
        this.user = JSON.parse(data);
      } else {
        this.user = null;
      }
    });

    this.username = this._authService.getUsername()!;
  }

  viewProfile(username: string): void {
    if (this.username == username) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/profile', username]);
    }
  }
}
