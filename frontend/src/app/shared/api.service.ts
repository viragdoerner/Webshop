import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item} from "../product-list/model/item";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = "http://localhost:8080/items";


  constructor(private http : HttpClient) {

  }

  getAllItems() : Observable<Item[]> {
    let url = "http://localhost:8080/items";
    return this.http.get<Item[]>(this.BASE_URL);
  }

  postItem(item: Item) : Observable<any> {
    return  this.http.post(this.BASE_URL, item);
  }

  updateItem(item: Item) : Observable<any>{
    return  this.http.put(this.BASE_URL + "/" + item.itemId, item);
  }
}
