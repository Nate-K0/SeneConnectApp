import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './Post';
import { HttpClient } from '@angular/common/http';
import { User } from './User';

const perPage:number = 20;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(page:number, tag:string, category:string) : Observable<Post[]> {
    return this.http.get<Post[]>("https://seneconnect-api.vercel.app/api/posts?page="+page+"&perPage="+perPage);
  }

  getPostbyId(id: string): Observable<Post> {
    return this.http.get<Post>(`https://seneconnect-api.vercel.app/api/posts/${id}`);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>("https://seneconnect-api.vercel.app/api/posts?page=" + 1 + "&perPage=" + Number.MAX_SAFE_INTEGER + "");
  }

  newPost(data: Post): Observable<any> {
    return this.http.post<any>(`https://seneconnect-api.vercel.app/api/posts`, data);
  }

  updatePostById(id: string, data: Post): Observable<any> {
    return this.http.put<any>(`https://seneconnect-api.vercel.app/api/posts/${id}`, data);
  }

  // likePostById(id: string, data: string): Observable<any> {
  //   return this.http.put<any>(`https://seneconnect-api.vercel.app/api/posts/${id}`, data);
  // }

  // unlikePostById(id: string, data: string): Observable<any> {
  //   return this.http.put<any>(`https://seneconnect-api.vercel.app/api/posts/${id}`, data);
  // }

  deletePostById(id: string): Observable<any> {
    return this.http.delete<any>(`https://seneconnect-api.vercel.app/api/posts/${id}`);
  }
}
