import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthentificationService} from "../services/authentification.service";
import {Utilisateur} from "../models/utilisateur";
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.scss']
})
export class RegisterCustomerComponent implements OnInit {

  isLoading = false;
  pass: boolean = false;

  constructor(private authService: AuthentificationService, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  clickEvent() {
    this.pass = !this.pass;
  }

  registerEmail(form: any) {
    this.isLoading = true;
    const user: Utilisateur = new Utilisateur(form.value.nomRegister.toLocaleLowerCase(), form.value.emailRegister.toLocaleLowerCase(), 'email', 'customer');
    this.authService.signUpUser(user, form.value.passwordRegister).then(
      () => {
        this.router.navigateByUrl('home');
      },
      (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  lrgoogle() {
    this.isLoading = true;
    this.authService.GoogleAuth().then(
      () => {
        this.router.navigateByUrl('home');
      },
      (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

}
