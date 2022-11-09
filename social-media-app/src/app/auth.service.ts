import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    if (token) {
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }

  login(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/login', user);
  }
}
