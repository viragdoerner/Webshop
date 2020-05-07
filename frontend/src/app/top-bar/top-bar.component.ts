import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  username: string;
  private authority: string;

  constructor(private tokenStorage: TokenStorageService, private router: Router) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()){
      this.username = this.tokenStorage.getUsername();
       let role = this.tokenStorage.getAuthority();
       console.log('1. top-bar init: ' + role);
      if(role ==='ROLE_ADMIN'){
        this.authority = 'admin';
      }
      if(role ==='ROLE_USER'){
        this.authority = 'user';
      }
      console.log('2. top-bar init: ' + this.authority);
    }
  }

  public Logout(){
    console.log('signout');
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/');
    console.log('signout wtf');

  }

}
