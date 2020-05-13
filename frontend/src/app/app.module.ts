import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {TopBarComponent} from "./top-bar/top-bar.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from './form-modal/form-modal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthInterceptor} from "./auth/auth-interceptor";
import { NeworderComponent } from './neworder/neworder.component';
import { MyorderComponent } from './myorder/myorder.component';
import { AllorderComponent } from './allorder/allorder.component';
import { UsersComponent } from './users/users.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSliderModule} from "@angular/material/slider";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
// MDB Angular Free

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    FormModalComponent,
    LoginComponent,
    RegisterComponent,
    NeworderComponent,
    MyorderComponent,
    AllorderComponent,
    UsersComponent
  ],
  imports: [
    MatSliderModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot([
      {path: '', component: ProductListComponent},
    ]),
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
  ],
  providers: [
    {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    FormModalComponent
  ]
})
export class AppModule {

}
