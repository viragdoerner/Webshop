import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListComponent} from "./product-list/product-list.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {NeworderComponent} from "./neworder/neworder.component";
import {MyorderComponent} from "./myorder/myorder.component";
import {AllorderComponent} from "./allorder/allorder.component";
import {UsersComponent} from "./users/users.component";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'items',
    component: ProductListComponent
  },
  {
    path: 'neworder',
    component: NeworderComponent
  },
  {
    path: 'myorder',
    component: MyorderComponent
  },
  {
    path: 'allorder',
    component: AllorderComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
