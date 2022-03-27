import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../services/authentification.service";
import {AlertService} from "../services/alert.service";
import {Utilisateur} from "../models/utilisateur";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-vendor',
  templateUrl: './register-vendor.component.html',
  styleUrls: ['./register-vendor.component.scss']
})
export class RegisterVendorComponent implements OnInit {

  isLoading = false;
  pass: boolean = false;

  constructor(private authService: AuthentificationService, private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
  }

  clickEvent() {
    this.pass = !this.pass;
  }

  registerEmail(form: any) {
    this.isLoading = true;
    const user: Utilisateur = new Utilisateur(form.value.nom.toLocaleLowerCase(), form.value.email.toLocaleLowerCase(), 'email', 'vendor');
    user.country = form.value.country;
    user.phone = form.value.phone;

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
}
