import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly APIURL: string;
  private isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.APIURL = 'http://localhost:51595/api/account';
    this.isLoggedIn = false;
  }

  setLoginStatus(status: boolean): void {
    this.isLoggedIn = status;
  }

  getLoginStatus(): boolean {
    return this.isLoggedIn;
  }

  register(user: User) {
    return this.http.post<User>(this.APIURL + '/signup', user);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.APIURL + '/login', user);
  }

  logout(): Observable<any> {
    return this.http.get<any>(this.APIURL + '/logout');
  }
}
