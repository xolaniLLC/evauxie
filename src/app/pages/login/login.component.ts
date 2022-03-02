import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  constructor(private router: Router, private authService: AuthentificationService) { }

  ngOnInit(): void {
  }

  lrgoogle() {
    this.isLoading = true;
    this.authService.GoogleAuth().then(
      () => {
        window.location.reload();
      },
      (error) => {
        this.isLoading = false;
        alert('Une erreur est survenue, veillez reesayer plutard');
      }
    );
  }

  loginEmail(form: any) {
    this.isLoading = true;
    this.authService.signInUser(form.value.email, form.value.password).then(
      () => {
        this.router.navigateByUrl('home');
      },
      (error) => { alert(error);
        this.isLoading = false;
        alert('Une erreur est survenue, veillez reesayer plutard');
      }
    );
  }

}
