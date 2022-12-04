import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthService implements CanActivate {

  constructor(private _authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this._authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (this._authService.isAdmin()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
