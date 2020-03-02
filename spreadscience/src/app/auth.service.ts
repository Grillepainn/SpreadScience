import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'auth';
  isAuthenticated = false;

  constructor(private http: HttpClient) { }

  login(user: User) {
    this.isAuthenticated = true;
    return this.http.post<User>(`${this.baseUrl}/login`, user);
  }

  logout() {
    this.isAuthenticated = false;
    return this.http.get(`${this.baseUrl}/logout`);
  }
}
