import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {SignUpInfo} from "../auth/signup-info";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  signUpInfo: SignUpInfo;
  isSignedUp = false;
  isSignedUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.form);

    this.signUpInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
      false);

    this.authService.signUp(this.signUpInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignedUpFailed = false;
        this.router.navigateByUrl('/login');
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignedUpFailed=true;
      }
    )
  }
}
