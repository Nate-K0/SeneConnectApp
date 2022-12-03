import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './User';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getUserByUserName(user: User): Observable<any> {
    return this.http.get<any>("https://seneconnect-api.vercel.app/api/users/username/" + user.userName);
  }
}
