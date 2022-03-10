import { Injectable } from '@angular/core';
import {AuthentificationService} from "./authentification.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthentificationService,
              private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return new Promise((resolve, reject) => {
      this.authService.isAuthenticated().then(
        (docRef) => {
          if (docRef === false)
            this.router.navigate(['/login-customer']);
          resolve(docRef as boolean);
        }
      );
    });
  }
}
