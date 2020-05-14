import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  username: string;
  authority: string;

  constructor(private tokenStorage: TokenStorageService, private router: Router) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.username = this.tokenStorage.getUsername();
      this.authority = this.tokenStorage.getAuthority();
      console.log('top-bar init: ' + this.authority);
    }
  }

  public Logout() {
    console.log('signout');
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/');
    this.authority = null;
    console.log('signout wtf');

  }

}

