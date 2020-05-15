import { Component, OnInit } from '@angular/core';
import {Order} from '../model/order';
import {ApiService} from '../shared/api.service';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.scss']
})
export class MyorderComponent implements OnInit {

  orders: Order[] = [];
  public authority: string;
  private showItems: number;
  constructor(private apiService: ApiService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authority = this.tokenStorage.getAuthority();
      const user = this.tokenStorage.getUsername();
      this.getAllOrders(user);
    }
  }

  public getAllOrders(user: string) {
    this.apiService.getAllOrder().subscribe(
      res => {
        this.orders = res.filter(h => h.username === user);;
      },
      err => {
        alert("get error");
      }
    );
  }
  activeRow(id: number) {
    if (this.showItems === id){
      this.showItems = 0;
    }else{ this.showItems = id;}
  }

}
