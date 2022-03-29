import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthentificationService} from "../services/authentification.service";
import {UserService} from "../services/user.service";
import firebase from "firebase";

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.scss']
})
export class CompanyManagementComponent implements OnInit {

  error = '';

  constructor(private router: Router, private authService: AuthentificationService, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().then(
      (val) => {
        if(val) {
          this.userService.getInfosUserWitchId(firebase.auth().currentUser?.email).then(
            (docRef) => {
              if(docRef.typeUtilisateur === 'vendor') {
                this.router.navigateByUrl('company-management/my-company');
              } else {
                this.error = 'not vendor';
              }
            }
          );
        } else {
          this.error = 'not connected';
        }
      }
    );
  }

}
