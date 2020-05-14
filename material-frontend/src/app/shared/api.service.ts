import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item} from "../model/item";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = "http://localhost:8080/items";


  constructor(private http : HttpClient) {

  }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.BASE_URL);
  }

  postItem(item: object): Observable<Item> {
    console.log('service add');
    return this.http.post<Item>(this.BASE_URL, item);
  }

  updateItem(item: Item): Observable<any> {
    console.log("update");
    return  this.http.put(this.BASE_URL, item);
  }

  deleteItem(id: number) {
    this.http.delete(this.BASE_URL + '/' + id).subscribe(
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
