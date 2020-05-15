import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective} from 'angular-bootstrap-md';
import {ApiService} from '../shared/api.service';
import {Item} from '../model/item';
import {Order} from '../model/order';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.component.html',
  styleUrls: ['./neworder.component.scss']
})
export class NeworderComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  username: string;
  elements: any = [];
  cart: Item[] = [];
  headElements = ['Name', 'Category', 'Price', 'Add to cart'];
  searchText: string = '';
  previous: string;
  constructor(private apiService: ApiService, private tokenStorage: TokenStorageService) { }
  @HostListener('input') oninput() { this.searchItems();}
  ngOnInit() {
    this.getAllItems();
    this.mdbTable.setDataSource(this.elements);
    this.previous = this.mdbTable.getDataSource();
    if (this.tokenStorage.getToken()) {
      this.username = this.tokenStorage.getUsername();
    }
  }
  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous); this.elements = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['name', 'category']);
      this.mdbTable.setDataSource(prev);
    }
  }
  public getAllItems() {
    this.apiService.getAllItems().subscribe(
      res => {
        this.elements = res;
      },
      err => {
        alert("get error");
      }
    );
  }

  addToCart(item: Item) {
      this.cart.push(item);
  }

  deleteFromCart(id: number) {
    this.cart = this.cart.filter(h => h.itemId !== id);
  }

  orderItems() {
    const order: Object = {
      username: this.username,
      items: this.cart,
    };
    this.apiService.postOrder(order);
    this.cart = [];
  }
}
