import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserAdmin!: boolean;

  constructor(private http: HttpClient) { }

  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public setToken(token: string): void{
    localStorage.setItem('access_token', token);
  }

  public readToken(): User | null {
    const token = localStorage.getItem('access_token');

    if (token) {
      return jwtDecode(token);
    } else {
      return null;
    }
  }

  public deleteToken(): void {
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    if (token) {
      return true;
    } else {
      return false;
    }
  }

  setIsAdmin(isAdmin: boolean): void {
    this.isUserAdmin = isAdmin;
  }

  isAdmin() : boolean {
    return this.isUserAdmin;
  }

  login(user: User): Observable<any> {
    return this.http.post<any>('https://seneconnect-api.vercel.app/api/login', user);
  }
}
