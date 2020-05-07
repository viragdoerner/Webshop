import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./auth/token-storage.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shoppinglist-app';

  private role: string;
  private authority: string;

  constructor(private tokenStorage: TokenStorageService){  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()){
      this.role = this.tokenStorage.getAuthority();
      if(this.role ==='ROLE_ADMIN'){
        this.authority = 'admin';
      }
      if(this.role ==='ROLE_USER'){
        this.authority = 'user';
      }
    }
  }
}
