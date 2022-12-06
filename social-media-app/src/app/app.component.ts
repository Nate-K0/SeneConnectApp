import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'social-media-app';

  constructor() {   
    window.onbeforeunload = function() {
      localStorage.clear();
      return '';
    };
  }
}
