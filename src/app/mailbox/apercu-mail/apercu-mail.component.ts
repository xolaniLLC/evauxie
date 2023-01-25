import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../services/message.service";
import {Message} from "../../models/message";
import {ActivatedRoute} from "@angular/router";
import firebase from "firebase";
import {UserService} from "../../services/user.service";
import {Utilisateur} from "../../models/utilisateur";
import {Evenement} from "../../models/evenement";
import {WriteMailService} from "../../services/write-mail.service";
import {CompanyService} from "../../services/company.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-apercu-mail',
  templateUrl: './apercu-mail.component.html',
  styleUrls: ['./apercu-mail.component.scss']
})
export class ApercuMailComponent implements OnInit {

  currentMessage: Message | any;
  currentEmailUser = firebase.auth().currentUser?.email;
  currentAuteurMessage: Utilisateur | any;
  currentDestinatairesMessage: Utilisateur[] = [];
  tooltip_status = -1;
  writeMail = false;

  constructor(public alertService: AlertService, public companyService: CompanyService, public writeMailService: WriteMailService, private messageService: MessageService, private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.messageService.getMessageWitchId(this.activatedRoute.snapshot.paramMap.get('id')).then(
      (data) => {
        if(data.auteur === firebase.auth().currentUser?.email || data.destinataires.includes(firebase.auth().currentUser?.email as string)) {
          this.currentMessage = data;

          this.userService.getInfosUserWitchId(this.currentMessage.auteur).then(
            (docref) => {
              this.currentAuteurMessage = docref;
            }
          );
          const pointe = this;
          this.currentMessage.destinataires.forEach(function (dest: any) {
            pointe.userService.getInfosUserWitchId(dest).then(
              (result) => {
                pointe.currentDestinatairesMessage.push(result);
              }
            );
          });

          if(!this.currentMessage.read.includes(firebase.auth().currentUser?.email as string)) {
            const tmp = this.currentMessage;
            tmp.read.push(firebase.auth().currentUser?.email as string);
            this.messageService.updateMessage(tmp).then();
          }
        }
      }
    );
  }

  openWrite(dest: any, reponse: any) {
    this.writeMailService.new(dest, '', '', reponse);
  }

  comptNombreOccurance(texte: string, caractere: string) {
    return texte.split(caractere).length - 1;
  }

  validBook(idCompany: string, idEvent: string) {
    console.log(idCompany + '@' + idEvent);
    this.companyService.getCompanyWitchId(idCompany).then(
      (data) => {
        if(data.eventEnCours.includes(idEvent)) {
          this.alertService.print('Event already booked', 'warning');
        } else {
          data.eventEnCours.push(idEvent);
          this.companyService.updateCompany(data).then(
            () => {
              this.alertService.print('Done', 'success');
            }
          );
        }
      }
    );
  }

}
