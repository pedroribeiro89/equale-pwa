import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = 'equale_access_token';
  private _loggedUser: User;
  public get loggedUser(): User {
    if (!this._loggedUser) {
      const token = localStorage.getItem(this.TOKEN_KEY);
      this._loggedUser = this.jwtHelper.decodeToken(token);
    }
    return this._loggedUser;
  }

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

  isLoggedIn(): boolean { return localStorage.getItem(this.TOKEN_KEY) != null; }

  updateToken(token: string) { localStorage.setItem(this.TOKEN_KEY, token); }

  login(email: string, password: string) {
    return this.http.post(environment.baseUrl + '/auth-token', { email, password })
      .pipe(tap((response: string) => {
        this.updateToken(response);
      }));
  }

  logoutUser() {
    localStorage.removeItem(this.TOKEN_KEY);
    this._loggedUser = null;
    this.router.navigate(['']);
  }
}
