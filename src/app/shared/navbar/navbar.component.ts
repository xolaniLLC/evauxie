import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {MessageService} from "../../services/message.service";
import {AuthentificationService} from "../../services/authentification.service";
import { Router } from '@angular/router';
import firebase from "firebase";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  sm_1 = false;
  sm_1_1 = false;
  sm_1_2 = false;
  sm_1_3 = false;
  isConnected = -1;
  currentUser: any = null;
  messagesNonLus: any[] = [];
  userDropdown = false;

  constructor(private messageService: MessageService, private userService: UserService, private authService: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().then(
      (val) => {
        if(val) {
          this.isConnected = 1;
          const tmpData: any = firebase.auth().currentUser?.email;
          this.userService.getInfosUserWitchId(tmpData).then(
            (data) => {
              this.currentUser = data;

              this.messageService.getMesMessagesNonLus().then(
                (msg) => {
                  this.messagesNonLus = msg;
                }
              );
            }
          );
        } else { this.isConnected = 0; }
      }
    )
  }

  goDeconnect() {
    this.authService.signOut().then(
      () => {
        location.reload();
      }
    );
  }

}
