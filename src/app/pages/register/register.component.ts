import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../services/authentification.service";
import {Router} from "@angular/router";
import {Utilisateur} from "../../models/utilisateur";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading = false;

  constructor(private authService: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
  }

  registerEmail(form: any) {
    this.isLoading = true;
    const user: Utilisateur = new Utilisateur(form.value.nomRegister.toLocaleLowerCase(), form.value.prenomRegister.toLocaleLowerCase(), form.value.emailRegister.toLocaleLowerCase(), 'email', form.value.isVendor ? 'vendor' : 'customer');
    if (form.value.isVendor) { user.country = form.value.countryRegister; user.priceRang = form.value.priceRangRegister; }
    this.authService.signUpUser(user, form.value.passwordRegister).then(
      () => {
        this.router.navigateByUrl('home');
      },
      (error) => {
        this.isLoading = false;
        alert('Une erreur est survenue, veillez reesayer plutard');
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
        alert('Une erreur est survenue, veillez reesayer plutard');
      }
    );
  }

}
