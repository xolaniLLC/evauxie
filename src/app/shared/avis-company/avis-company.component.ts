import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AvisCompanyService} from "../../services/avis-company.service";
import {AvisCompany} from "../../models/avis-company";

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

  constructor(private userService: UserService, private avisComService: AvisCompanyService) { }

  ngOnInit(): void {
    this.avisComService.getAvisWitchId(this.idAvis).then(
      (data0) => {
        this.currentAvis = data0;

        this.userService.getInfosUserWitchId(this.currentAvis.auteur).then(
          (data1) => {
            this.currentUser = data1;
          }
        );
      }
    );
  }

}
