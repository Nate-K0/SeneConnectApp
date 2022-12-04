import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  user: any;

  constructor(private _searchService: SearchService) { }

  ngOnInit(): void {
    this._searchService.data.subscribe((data) => {
      if (data != null) {
        this.user = JSON.parse(data);
      } else {
        this.user = null;
      }
    });
  }

}
