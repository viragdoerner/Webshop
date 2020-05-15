import { Component, OnInit } from '@angular/core';
import {AuthLoginInfo} from '../auth/login-info';
import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {Router} from '@angular/router';
import {SignUpInfo} from '../auth/signup-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  failed = false;
  errorMessage = '';
  private signupInfo: SignUpInfo;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
      false
    );
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data );
        this.failed = false;
        this.router.navigateByUrl('/login');
      },
      (error) => {
        this.failed = true;
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }
}
