import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  isLoggedIn = false;
  username: string;
  admin: boolean =false;

  constructor(private tokenStorage: TokenStorageService,) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      let roles = this.tokenStorage.getAuthorities();
      console.log(roles[0]);
      console.log(roles[0] === 'ROLE_ADMIN');
      this.admin = (roles[0] === 'ROLE_ADMIN');
      this.username = this.tokenStorage.getUsername();
    }
  }

  public Logout(){
    this.tokenStorage.signOut();
  }

}
