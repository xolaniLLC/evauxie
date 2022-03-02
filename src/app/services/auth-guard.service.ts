import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthentificationService} from "./authentification.service";
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
          if (docRef === true) {
            this.router.navigate(['/home']);
          }
          resolve(!docRef as boolean);
        }
      );
    });
  }
}
