import {Component, Input, OnInit} from '@angular/core';
import {AuthentificationService} from "../../services/authentification.service";
import {AvisCompanyService} from "../../services/avis-company.service";
import {AvisCompany} from "../../models/avis-company";
import {AlertService} from "../../services/alert.service";
import firebase from "firebase";

@Component({
  selector: 'app-miniative-give-notice',
  templateUrl: './miniative-give-notice.component.html',
  styleUrls: ['./miniative-give-notice.component.scss']
})
export class MiniativeGiveNoticeComponent implements OnInit {

  @Input() idCompany: string | any;

  constructor(private alertService: AlertService, private authService: AuthentificationService, private avisCompanyService: AvisCompanyService) { }

  note = 0;
  texte = '';
  displayBtn = false;
  isConnected: any = null;

  ngOnInit(): void {
    this.authService.isAuthenticated().then(
      (val) => {
        this.isConnected = val;
      }
    );
  }

  send() {
    this.isConnected = null;
    this.avisCompanyService.addAvis(new AvisCompany(this.idCompany, this.note + 1, this.texte, firebase.auth().currentUser?.email as string)).then(
      () => {
        this.note = 0;
        this.texte = '';
        this.isConnected = true;
        this.alertService.print('Notice sent with success', 'success');
      }, (error) => {
        this.alertService.print(error, 'danger');
      }
    );
  }

}
