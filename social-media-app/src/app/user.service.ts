import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './User';
import { HttpClient } from '@angular/common/http';

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

  deleteUserById(id: string): Observable<any> {
    return this.http.delete<any>(`https://seneconnect-api.vercel.app/api/users/${id}`);
  }
}
