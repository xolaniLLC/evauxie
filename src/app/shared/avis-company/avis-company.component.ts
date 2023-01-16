import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AvisCompanyService} from "../../services/avis-company.service";
import {AvisCompany} from "../../models/avis-company";
import {CompanyService} from "../../services/company.service";
import {Company} from "../../models/company";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-avis-company',
  templateUrl: './avis-company.component.html',
  styleUrls: ['./avis-company.component.scss']
})
export class AvisCompanyComponent implements OnInit {

  @Input() idAvis: string | any;
  @Input() reply = false;

  currentUser: any = null;
  currentAvis: AvisCompany | any = null;
  currentCompany: Company | any;
  isLoading = false;
  reponseGetAdmin = '';

  constructor(private alertService: AlertService, private userService: UserService, private avisComService: AvisCompanyService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.avisComService.getAvisWitchId(this.idAvis).then(
      (data0) => {
        this.currentAvis = data0;

        this.companyService.getCompanyWitchId(this.currentAvis.idCompany).then(
          (donnee) => {
            this.currentCompany = donnee;
          }
        );

        this.userService.getInfosUserWitchId(this.currentAvis.auteur).then(
          (data1) => {
            this.currentUser = data1;
          }
        );
      }
    );
  }

  sendReply() {
    this.isLoading = true;
    let tmp = this.currentAvis;
    tmp.reponseCompany = this.reponseGetAdmin;
    this.avisComService.updateAvis(tmp).then(
      () => {
        this.isLoading = false;
        this.currentAvis = tmp;
        this.reponseGetAdmin = '';
      }, (error) => {
        this.alertService.print(error, 'warning');
      }
    )
  }

}
