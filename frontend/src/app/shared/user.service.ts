import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: "root",
})
export class UserService {

  private BASE_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getUserBoard(): Observable<string> {
    return this.http.get(this.BASE_URL + '/test/user', { responseType: "text"});
  }
  getAdminBoard(): Observable<string> {
    return this.http.get(this.BASE_URL +'/test/admin', { responseType: "text"});
  }
}
