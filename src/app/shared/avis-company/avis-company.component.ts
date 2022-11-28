import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AvisCompanyService} from "../../services/avis-company.service";
import {AvisCompany} from "../../models/avis-company";
import {CompanyService} from "../../services/company.service";
import {Company} from "../../models/company";

@Component({
  selector: 'app-avis-company',
  templateUrl: './avis-company.component.html',
  styleUrls: ['./avis-company.component.scss']
})
export class AvisCompanyComponent implements OnInit {

  @Input() idAvis: string | any;

  isToggle: any;
  currentUser: any = null;
  currentAvis: AvisCompany | any = null;
  currentCompany: Company | any;

  constructor(private userService: UserService, private avisComService: AvisCompanyService, private companyService: CompanyService) { }

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

}
