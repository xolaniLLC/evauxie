import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {MessageService} from "../../services/message.service";
import {AuthentificationService} from "../../services/authentification.service";
import { Router } from '@angular/router';
import firebase from "firebase";
import {CategorieActivite} from "../../models/categorie-activite";
import {CategoriesService} from "../../services/categories.service";

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
  categories: CategorieActivite[] = [];
  sousCategoriesVenue: CategorieActivite[] = [];
  isLoadingCat = true;
  isLoadingSousCatVenu = true;

  constructor(private categorieService: CategoriesService, private messageService: MessageService, private userService: UserService, private authService: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().then(
      (val) => {
        if(val) {
          const tmpData: any = firebase.auth().currentUser?.email;
          this.userService.getInfosUserWitchId(tmpData).then(
            (data) => {
              this.isConnected = 1;
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
    );

    this.categorieService.getCategoriesActivites().then(
      (data) => {
        this.categories = data;
        this.isLoadingCat = false;
      }
    )

    this.categorieService.getSousCategoriesActivites('318a527a244caec0556dae').then(
      (data) => {
        this.sousCategoriesVenue = data;
        this.isLoadingSousCatVenu = false;
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
