import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtResponse} from "./jwt-response";
import {AuthLoginInfo} from "./login-info";
import {SignUpInfo} from "./signup-info";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:8080/api/auth'
  private loginUrl = this.BASE_URL + '/signin';
  private signupUrl =  this.BASE_URL + '/signup';

  constructor(private http: HttpClient) { }

 attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<String>{
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  /*attemptAuth(credentials): Observable<any> {
    return this.http.post(this.BASE_URL + '/signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  signUp(user): Observable<any> {
    return this.http.post(this.BASE_URL + '/signup', {
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }*/
}
