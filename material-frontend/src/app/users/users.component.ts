import { Component, OnInit } from '@angular/core';
import {Order} from '../model/order';
import {ApiService} from '../shared/api.service';
import {User} from '../model/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers() {
    this.apiService.getAllUser().subscribe(
      res => {
        this.users = res;
      },
      err => {
        alert('get error');
      }
    );
  }

}
