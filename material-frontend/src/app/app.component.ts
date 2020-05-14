import { Component } from '@angular/core';
import {TokenStorageService} from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kliens-oldali-hf';

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
