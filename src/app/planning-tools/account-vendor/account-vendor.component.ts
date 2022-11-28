import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../models/utilisateur";
import {CompanyService} from "../../services/company.service";
import {Company} from "../../models/company";
import {UserService} from "../../services/user.service";
import firebase from "firebase";
import {AuthentificationService} from "../../services/authentification.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-account-vendor',
  templateUrl: './account-vendor.component.html',
  styleUrls: ['./account-vendor.component.scss']
})
export class AccountVendorComponent implements OnInit {

  sousMenu = 1;
  currentUser!: Utilisateur;
  currentCompany! : Company;
  isLoading = false;

  constructor(private alertService: AlertService, private authService: AuthentificationService, private companyService: CompanyService, private userService: UserService) { }

  ngOnInit(): void {
    this.companyService.getCompanies().then(
      (docRef) => {
        for(let i=0; i<docRef.length; i++) {
          if(docRef[i].date) {
            this.currentCompany = docRef[i];
          }
        }
      }
    );

    this.userService.getInfosUserWitchId(firebase.auth().currentUser!.email).then(
      (data) => {
        this.currentUser = data;
      }
    );
  }

  save() { console.log(this.currentUser.nom);
    this.isLoading = true;
    this.userService.updateUser(this.currentUser).then(
      () => {
        this.isLoading = false;
      }
    );
  }

  async presentResetPassword() {
    this.isLoading = true;
    this.authService.resetPassword(this.currentUser.email).then(
      () => {
        this.isLoading = false;
        this.alertService.print('The reset information has been sent to your email address', 'success');
      },
      (error) => {
        this.alertService.print(error, 'warning');
      }
    );
  }

}
