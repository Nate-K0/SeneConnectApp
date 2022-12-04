import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  data: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getUserByUserName(username: any | undefined): Observable<any> {
    return this.http.get<any>("https://seneconnect-api.vercel.app/api/users/username/" + username);
  }

  setLatestData(data: any) {
    this.data.emit(data);
  }
}
