import { Blogpost } from './models/blogpost';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  baseUrl = 'api/v1/blog-posts';
  private blogPostCreated = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  createBlogPost(post: Blogpost) {
    return this.httpClient.post<Blogpost>(this.baseUrl, post);
  }

  handleBlogPostCreated() {
    return this.blogPostCreated.asObservable();
  }

  dispatchBlogPostCreated(id: string) {
    this.blogPostCreated.next(id);
  }

  getBlogPosts(): Observable<Blogpost[]> {
    return this.httpClient.get<Blogpost[]>(`${this.baseUrl}/`);
  }

  getBlogPostById(id): Observable<Blogpost> {
    return this.httpClient.get<Blogpost>(`${this.baseUrl}/${id}`);
  }

  getBlogPostByCat(cat): Observable<Blogpost> {
    return this.httpClient.get<Blogpost>(`${this.baseUrl}/cat/${cat}`);
  }

  updateBlogPost(id: string, blogpost: Blogpost) {
    return this.httpClient.put(`${this.baseUrl}/${id}`, blogpost);
  }

  deleteSinglePost(id: String) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  deleteBlogPosts(ids: string[]) {
    const allIds = ids.join(',');
    return this.httpClient.delete(`${this.baseUrl}/?ids=${allIds}`);
  }
}
