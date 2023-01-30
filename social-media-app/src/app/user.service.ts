import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './User';
import { HttpClient } from '@angular/common/http';
import { Profile } from './Profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>("https://seneconnect-api.vercel.app/api/users");
  }

  newUser(data: User): Observable<any> {
    return this.http.post<any>(`https://seneconnect-api.vercel.app/api/users`, data);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`https://seneconnect-api.vercel.app/api/users/${id}`);
  }

  deleteUserById(id: string): Observable<any> {
    return this.http.delete<any>(`https://seneconnect-api.vercel.app/api/users/${id}`);
  }

  newProfile(data: Profile): Observable<any> {
    return this.http.post<any>(`https://seneconnect-api.vercel.app/api/profiles`, data);
  }

  getProfileByUsername(username: string): Observable<any> {
    return this.http.get<any>(`https://seneconnect-api.vercel.app/api/profiles/${username}`);
  }
}
