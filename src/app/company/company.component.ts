import { Component, OnInit } from '@angular/core';
import {CompanyService} from "../services/company.service";
import {Company} from "../models/company";
import {CategorieActivite} from "../models/categorie-activite";
import {AlertService} from "../services/alert.service";
import {EvenementService} from "../services/evenement.service";
import {CategoriesService} from "../services/categories.service";
import {WriteMailService} from "../services/write-mail.service";
import {ActivatedRoute} from "@angular/router";
import {AvisCompanyService} from "../services/avis-company.service";
import {AvisCompany} from "../models/avis-company";
import {AuthentificationService} from "../services/authentification.service";
import firebase from "firebase";
import {ToolsService} from "../services/tools.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  currentCompany: Company | any = null;
  categorie: CategorieActivite | any = null;
  isLike: boolean | any = null;
  isSollicite: boolean | any = null;
  avisCurrentCompany: AvisCompany[] = [];
  isConnected: any = null;

  slider: any;
  defaultTransform: any;

  isToggle: any[] = [];

  constructor(private authService: AuthentificationService, private translate: TranslateService, private avisCompanyService: AvisCompanyService, private alertService: AlertService, private activatedRoute: ActivatedRoute, private evenementService: EvenementService, private companyService: CompanyService, private categorieService: CategoriesService, private writeMailService: WriteMailService) { }

  ngOnInit() {

    this.slider = document.getElementById("slider");
    this.defaultTransform=0;

    this.companyService.getCompanyWitchId(this.activatedRoute.snapshot.paramMap.get('id')).then(
      (data0) => {
        this.currentCompany = data0;

        this.avisCompanyService.getAvisWitchIdCompany(this.currentCompany.id).then(
          (docRef) => {
            this.avisCurrentCompany = docRef;
          }
        );

        this.categorieService.getCategorieWitchId(this.currentCompany.categorie).then(
          (data) => {
            this.categorie = data;
          }
        );

        this.authService.isAuthenticated().then(
          (val) => {
            let idUserSave;
            if(!localStorage.getItem('guestUser')) {
              const gid = new ToolsService();
              localStorage.setItem('guestUser', ('guestUser_' + gid.generateId(7)));
            }
            idUserSave = val ? firebase.auth().currentUser?.email : localStorage.getItem('guestUser');
            this.isConnected = val;

            if(val) {
              this.evenementService.isLikeCompany(this.currentCompany).then(
                (data) => {
                  this.isLike = data;
                }
              );

              this.evenementService.isSolliciteCompany(this.currentCompany).then(
                (data) => {
                  this.isSollicite = data;
                }
              );
            }

            if ((val && !this.currentCompany.vue.includes(idUserSave)) || (!val && !this.currentCompany.vue.includes(idUserSave))) {
              this.currentCompany.vue.push(idUserSave);
              this.companyService.updateCompany(this.currentCompany);
            }
          }
        );
      }
    );
  }



  getValueTraduct(texte: string, langue: string = '') {
    const wrapper = document.createElement('div');
    wrapper.innerHTML= texte;
    return wrapper.getElementsByTagName(langue ? langue : this.translate.defaultLang).length > 0 ? wrapper.getElementsByTagName(langue ? langue : this.translate.defaultLang)[0].innerHTML.replace('amp;', '')  : (texte && texte.includes('</') ? '' : texte);
  }

  calculMoyenneAvis() {
    let resultat = 0;
    for(let i=0; i<this.avisCurrentCompany.length; i++) {
      resultat += this.avisCurrentCompany[i].note;
    }
    return this.avisCurrentCompany.length > 0 ? Math.round(resultat / this.avisCurrentCompany.length) : 0;
  }

  goNext() {
    this.defaultTransform = this.defaultTransform - 398;
    if (Math.abs(this.defaultTransform) >= this.slider.scrollWidth / 1.7) this.defaultTransform = 0;
    this.slider.style.transform = "translateX(" + this.defaultTransform + "px)";
  }

  goPrev() {

    if (Math.abs(this.defaultTransform) === 0) this.defaultTransform = 0;
    else this.defaultTransform = this.defaultTransform + 398;
    this.slider.style.transform = "translateX(" + this.defaultTransform + "px)";
  }

  updateLikeCompany() {
    const oldEtat = this.isLike;
    this.isLike = null;
    this.evenementService.likeCompany(this.currentCompany).then(
      () => {
        this.isLike = !oldEtat;
      }, (error) => {
        this.alertService.print(error,'danger');
      }
    );
  }

  updateSolliciteCompany() {
    const oldEtat = this.isSollicite;
    this.isSollicite = null;
    this.evenementService.solliciteCompany(this.currentCompany).then(
      () => {
        this.isSollicite = !oldEtat;
      }, (error) => {
        this.alertService.print(error,'danger');
      }
    );
  }

  requestPrice() {
    this.writeMailService.new(this.currentCompany.administrateurs, 'Request pricing', 'Hello everyone! We are interested in your service at your facility. Could you please send us some information about your packages? Thank you!', '');
  }

}
