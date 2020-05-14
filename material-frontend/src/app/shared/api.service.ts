import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item} from "../model/item";
import {Order} from '../model/order';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL_ITEMS = "http://localhost:8080/items";
  private BASE_URL_ORDERS = "http://localhost:8080/orders";
  private BASE_URL_USERS = "http://localhost:8080/users";

  constructor(private http: HttpClient) {

  }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.BASE_URL_ITEMS);
  }

  postItem(item: object): Observable<Item> {
    console.log('service add');
    return this.http.post<Item>(this.BASE_URL_ITEMS, item);
  }

  updateItem(item: Item): Observable<any> {
    console.log("update");
    return  this.http.put(this.BASE_URL_ITEMS, item);
  }

  deleteItem(id: number) {
    this.http.delete(this.BASE_URL_ITEMS + '/' + id).subscribe(
      (res) => {
        // tslint:disable-next-line:prefer-const
        console.log(res);
      },
      (err) => {
        alert('get error');
      }
    );
  }

  getAllOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(this.BASE_URL_ORDERS);
  }

  updateOrder(id: number, status: string) {
    return  this.http.put(this.BASE_URL_ORDERS + '/' + id, status);
  }

  deleteOrder(id: number) {
    this.http.delete(this.BASE_URL_ORDERS + '/' + id).subscribe(
      (res) => {
        // tslint:disable-next-line:prefer-const
        console.log(res);
      },
      (err) => {
        alert('get error');
      }
    );
  }

  public getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.BASE_URL_USERS);
  }

  deleteUser(id: number) {
    this.http.delete(this.BASE_URL_USERS + '/' + id).subscribe(
      (res) => {
        // tslint:disable-next-line:prefer-const
        console.log(res);
      },
      (err) => {
        alert('get error');
      }
    );
  }
}
