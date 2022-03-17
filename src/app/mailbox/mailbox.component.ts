import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MessageService} from "../services/message.service";
import {Message} from "../models/message";
import firebase from "firebase";
import {UserService} from "../services/user.service";
import {Utilisateur} from "../models/utilisateur";
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss']
})
export class MailboxComponent implements OnInit {

  destinatairesMessage = '';
  mesMessagesRecu: Message[] = [];
  mesMessagesEnvoyer: Message[] = [];
  currentEmailUser: any = firebase.auth().currentUser?.email;
  msgNonLu = 0;
  currentIndexMessage = -1;
  reponseText = '';
  viewElement = 'inbox';
  viewTypeMessage = '';
  menuOption = '';
  currentUser: Utilisateur | any;
  isLoading = false;

  constructor(private messageService: MessageService, private activatedRoute: ActivatedRoute, private userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.queryParams['write']) {
      this.destinatairesMessage = this.activatedRoute.snapshot.queryParams['write'];
    }

    this.userService.getInfosUserWitchId(firebase.auth().currentUser?.email).then(
      (data) => {
        this.currentUser = data;
      }
    );

    this.messageService.getMesMessagesRecu().then(
      (result) => {
        this.mesMessagesRecu = result;
        for(let i=0; i<this.mesMessagesRecu.length; i++) {
          if(!this.mesMessagesRecu[i].read.includes(this.currentEmailUser)) { this.msgNonLu++; }
        }
      });

    this.messageService.getMesMessagesEnvoyer().then(
      (result1) => {
        this.mesMessagesEnvoyer = result1;
      }
    );
  }

  updateReadMessage(message: Message) {
    this.isLoading = true;
    let tmpMsg = this.mesMessagesRecu[this.currentIndexMessage];
    tmpMsg.read.push(firebase.auth().currentUser?.email as String | any);
    this.messageService.updateMessage(tmpMsg).then(
      () => {
        this.isLoading = false;
        this.alertService.print('Operation successfully completed', 'success');
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  repondreMessage() {
    this.isLoading = true;
    let tmpMsg = new Message(firebase.auth().currentUser?.email, this.mesMessagesRecu[this.currentIndexMessage].objet, [this.mesMessagesRecu[this.currentIndexMessage].auteur], this.reponseText, '');
    tmpMsg.reponse = this.mesMessagesRecu[this.currentIndexMessage].id;
    this.messageService.envoyerMessage(tmpMsg).then(
      () => {
        this.isLoading = false;
        this.alertService.print('Operation successfully completed', 'success');
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  getNombreJoursRestant(date: any) {
    const date1 = new Date();
    const date2 = new Date(date);
    const Diff_temps = date2.getTime() - date1.getTime();
    return Math.trunc(Diff_temps / (1000 * 3600 * 24));
  }

  sendMessage(form: any) {
    const tmpDest = form.value.destinataires.split(',');
    const tmpFdest = [];
    for(let i=0; i < tmpDest.length; i++) {
      tmpFdest.push(tmpDest[i].trim());
    }
    this.messageService.envoyerMessage(new Message(firebase.auth().currentUser?.email, form.value.objet, tmpFdest, form.value.description, '')).then(
      () => {
        this.isLoading = false;
        this.alertService.print('Operation successfully completed', 'success');
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

}
