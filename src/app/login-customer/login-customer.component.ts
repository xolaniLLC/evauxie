import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthentificationService} from "../services/authentification.service";
import {AlertService} from "../services/alert.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.scss']
})
export class LoginCustomerComponent implements OnInit {

  isLoading = false;

  pass: boolean = false;
  clickEvent() {
    this.pass = !this.pass;
  }

  constructor(private location: Location, private router: Router, private authService: AuthentificationService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  lrgoogle() {
    this.isLoading = true;
    this.authService.GoogleAuth().then(
      () => {
        this.location.back();
      },
      (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  loginEmail(form: any) {
    this.isLoading = true;
    this.authService.signInUser(form.value.email, form.value.password).then(
      () => {
        this.location.back();
      },
      (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

}
