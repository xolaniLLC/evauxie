import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../services/categories.service";
import {CategorieActivite} from "../models/categorie-activite";
import {AlertService} from "../services/alert.service";
import {AuthentificationService} from "../services/authentification.service";
import {UserService} from "../services/user.service";
import firebase from "firebase";
import {CompanyService} from "../services/company.service";
import {Company} from "../models/company";
import {WriteMailService} from "../services/write-mail.service";
import {Location} from "@angular/common";
import {GroupForum} from "../models/group-forum";

@Component({
  selector: 'app-e-admin',
  templateUrl: './e-admin.component.html',
  styleUrls: ['./e-admin.component.scss']
})
export class EAdminComponent implements OnInit {

  categoriesActivity: CategorieActivite[] = [];
  groupeForum: GroupForum[] = [];
  company: Company[] = [];
  isLoadCat = true;
  isLoadGF = true;
  isLoadCom = true;
  isAdmin = -1;

  constructor(private location: Location, private writeService: WriteMailService, private companyService: CompanyService, private userService: UserService, private alertService: AlertService, private categorieService: CategoriesService) { }

  ngOnInit(): void {
    this.userService.getInfosUserWitchId(firebase.auth().currentUser?.email).then(
      (donnee) => {
        if(['mexapaul53@gmail.com', 'duplexetchoffo@gmail.com', 'ladywendy910@yahoo.fr', 'wendydackaml@gmail.com'].includes(donnee.email)) {
          this.isAdmin = 1;

          this.categorieService.getAllCategoriesActivites().then(
            (data) => {
              this.isLoadCat = false;
              this.categoriesActivity = data;
            }
          );

          this.categorieService.getAllGroupForumActivites().then(
            (data) => {
              this.isLoadGF = false;
              this.groupeForum = data;
            }
          );

          this.companyService.getAllCompanies().then(
            (data) => {
              this.isLoadCom = false;
              this.company = data;
            }
          );
        } else { this.isAdmin = 0; }
      }
    );
  }

  boutton_back() {
    this.location.back();
  }

  updateEtatCompany(company: Company) {
    if(company.verifier) {
      company.verifier = '';
    } else {
      company.verifier = (new Date().toString());
    }

    this.updateCompany(company);
  }

  writeEmailToUser(user: string) {
    this.writeService.new([user], '', '', '');
  }

  updateCompany(company: Company) {
    this.companyService.updateCompany(company).then(
      () => {
        this.alertService.print('Operation done', 'success');
      }
    );
  }

  addCat() {
    this.categoriesActivity.unshift(new CategorieActivite('', ''));
  }

  updateParentCategorie(event: any, categorie: CategorieActivite) {
    categorie.parent = event;
    this.categorieService.addCategorie(categorie).then(
      () => {
        this.alertService.print('Opération effectué', 'success');
      }
    );
  }

  updateNameCategorie(event: any, categorie: CategorieActivite) {
    categorie.titre = event;
    this.categorieService.addCategorie(categorie).then(
      () => {
        this.alertService.print('Opération effectué', 'success');
      }
    );
  }

  deleteCategorie(idCategorie: string) {
    this.categorieService.deleteCategorieActivite(idCategorie).then(
      () => {
        this.alertService.print('Opération effectué', 'success');
        this.ngOnInit();
      }
    );
  }

  addGroupForum() {
    this.groupeForum.unshift(new GroupForum('', ''));
  }

  updateParentGroupForum(event: any, groupeForum: GroupForum) {
    groupeForum.parent = event;
    this.categorieService.addGroupForum(groupeForum).then(
      () => {
        this.alertService.print('Opération effectué', 'success');
      }
    );
  }

  updateNameGroupForum(event: any, groupeForum: GroupForum) {
    groupeForum.titre = event;
    this.categorieService.addGroupForum(groupeForum).then(
      () => {
        this.alertService.print('Opération effectué', 'success');
      }
    );
  }

  deleteGroupForum(idGroupForum: string) {
    this.categorieService.deleteGroupForumActivite(idGroupForum).then(
      () => {
        this.alertService.print('Opération effectué', 'success');
        this.ngOnInit();
      }
    );
  }

}
