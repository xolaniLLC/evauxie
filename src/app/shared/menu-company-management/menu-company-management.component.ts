import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthentificationService} from "../../services/authentification.service";
import firebase from "firebase";

@Component({
  selector: 'app-menu-company-management',
  templateUrl: './menu-company-management.component.html',
  styleUrls: ['./menu-company-management.component.scss']
})
export class MenuCompanyManagementComponent implements OnInit {

  menu = -1;
  currentEmailUser: any;

  constructor(private router: Router, private authService: AuthentificationService) { }

  ngOnInit(): void {
    if(this.router.url.includes('dashboard')) {
      this.menu = 0;
    } if(this.router.url.includes('my-showcase')) {
      this.menu = 1;
    } else if(this.router.url.includes('review')) {
      this.menu = 2;
    } else if(this.router.url.includes('account-vendor')) {
      this.menu = 3;
    } else if(this.router.url.includes('booking-manager')) {
      this.menu = 4;
    }

    this.authService.isAuthenticated().then(
      (data) => {
        if(data) {
          this.currentEmailUser = firebase.auth().currentUser?.email;
        }
      }
    );
  }

}
