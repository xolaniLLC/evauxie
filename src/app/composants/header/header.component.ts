import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../services/authentification.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import firebase from "firebase";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isConnected = -1;
  currentUser: any = null;

  constructor(private userService: UserService, private authService: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().then(
      (val) => {
        if(val) {
          this.isConnected = 1;
          const tmpData: any = firebase.auth().currentUser?.email;
          this.userService.getInfosUserWitchId(tmpData).then(
            (data) => {
              this.currentUser = data;
            }
          );
        } else { this.isConnected = 0; }
      }
    )
  }

  goDeconnect() {
    this.authService.signOut().then(
      () => {
        this.router.navigateByUrl('home');
      }
    );
  }

}
