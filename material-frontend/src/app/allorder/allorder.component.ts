import { Component, OnInit } from '@angular/core';
import {Order} from '../model/order';
import {ApiService} from '../shared/api.service';
import {Item} from '../model/item';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-allorder',
  templateUrl: './allorder.component.html',
  styleUrls: ['./allorder.component.scss']
})
export class AllorderComponent implements OnInit {

  orders: Order[] = [];
  editField: string;
  showItems: number;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  public getAllOrders() {
    this.apiService.getAllOrder().subscribe(
      res => {
        this.orders = res;
      },
      err => {
        alert("get error");
      }
    );
  }
  updateStatus(order: Order, event: any) {
    this.apiService.updateOrder(order.id, event.target.textContent ).subscribe(
      data => {
        console.log(data);
      },
      error  => {
        console.log(error);
      }
    );
  }
  remove(id: number) {
    console.log('delete');
    this.apiService.deleteOrder(id);
    this.orders = this.orders.filter(h => h.id !== id);
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  activeRow(id: number) {
    if (this.showItems === id){
      this.showItems = 0;
    }else{ this.showItems = id;}
  }
}
