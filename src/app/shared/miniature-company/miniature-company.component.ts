import {Component, Input, OnInit} from '@angular/core';
import {CompanyService} from "../../services/company.service";
import {Company} from "../../models/company";
import {CategorieActivite} from "../../models/categorie-activite";
import {CategoriesService} from "../../services/categories.service";
import {WriteMailService} from "../../services/write-mail.service";
import {EvenementService} from "../../services/evenement.service";
import {AlertService} from "../../services/alert.service";
import {AvisCompany} from "../../models/avis-company";
import {AvisCompanyService} from "../../services/avis-company.service";

@Component({
  selector: 'app-miniature-company',
  templateUrl: './miniature-company.component.html',
  styleUrls: ['./miniature-company.component.scss']
})
export class MiniatureCompanyComponent implements OnInit {

  @Input() id: string | any;
  @Input() skin: string | any;
  currentCompany: Company | any = null;
  categorie: CategorieActivite | any = null;
  isLike: boolean | any = null;
  isSollicite: boolean | any = null;
  avisCurrentCompany: AvisCompany[] = [];

  constructor(private avisCompanyService: AvisCompanyService, private alertService: AlertService, private evenementService: EvenementService, private companyService: CompanyService, private categorieService: CategoriesService, private writeMailService: WriteMailService) { }

  ngOnInit(): void {
    this.companyService.getCompanyWitchId(this.id).then(
      (data0) => {
        this.currentCompany = data0;

        this.categorieService.getCategorieWitchId(this.currentCompany.categorie).then(
          (data) => {
            this.categorie = data;
          }
        );

        this.avisCompanyService.getAvisWitchIdCompany(this.currentCompany.id).then(
          (docRef) => {
            this.avisCurrentCompany = docRef;
          }
        );

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
    );
  }

  calculMoyenneAvis() {
    let resultat = 0;
    for(let i=0; i<this.avisCurrentCompany.length; i++) {
      resultat += this.avisCurrentCompany[i].note;
    }
    return this.avisCurrentCompany.length > 0 ? Math.round(resultat / this.avisCurrentCompany.length) : 0;
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
    this.updateLikeCompany();
    this.writeMailService.new(this.currentCompany.administrateurs, 'Request pricing', 'Hello everyone! We are interested in your service at your facility. Could you please send us some information about your packages? Thank you!', '');
  }

  getPureTexte(brute: any) {
    return brute.toString().replace(/<[^>]*>/g, '').replace('&nbsp;', '');
  }

}
