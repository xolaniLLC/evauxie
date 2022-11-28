import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import firebase from "firebase";

@Component({
  selector: 'app-planning-tools',
  templateUrl: './planning-tools.component.html',
  styleUrls: ['./planning-tools.component.scss']
})
export class PlanningToolsComponent implements OnInit {

  isLoading = true;

  constructor(private authService: AuthentificationService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().then(
      (etat) => {
        if(etat) {
          this.userService.getInfosUserWitchId(firebase.auth().currentUser?.email).then(
            (data) => {
              if (data.typeUtilisateur === 'customer') {
                this.router.navigateByUrl('planning-tools/dashboard');
              } else if (data.typeUtilisateur === 'vendor') {
                this.router.navigateByUrl('planning-tools/dashboard-vendor');
              }
              this.isLoading = false;
            });
        } else {
          this.isLoading = false;
        }
      }
    );
  }

}
