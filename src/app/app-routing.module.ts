import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginCustomerComponent} from "./login-customer/login-customer.component";
import {RegisterCustomerComponent} from "./register-customer/register-customer.component";
import {RedirectGuardService} from "./services/redirect-guard.service";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login-customer', canActivate: [RedirectGuardService], component: LoginCustomerComponent },
  { path: 'register-customer', canActivate: [RedirectGuardService], component: RegisterCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
