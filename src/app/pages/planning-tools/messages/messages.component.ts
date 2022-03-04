import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../../services/message.service";
import {Message} from "../../../models/message";
import firebase from "firebase";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  mesMessagesRecu: Message[] = [];
  mesMessagesEnvoyer: Message[] = [];
  currentMenuSelect = 'inbox';
  currentEmailUser: any = firebase.auth().currentUser?.email;
  currentIndexMessage = -1;
  typeCurrentIndexMessage = '';
  reponseText = '';
  msgNonLu = 0;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
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
    let tmpMsg = this.mesMessagesRecu[this.currentIndexMessage];
    tmpMsg.read.push(firebase.auth().currentUser?.email as String | any);
    this.messageService.updateMessage(tmpMsg).then(
      () => {
        alert('Mis à jour effectuée');
      }
    );
  }

  repondreMessage() {
    let tmpMsg = new Message(firebase.auth().currentUser?.email, this.mesMessagesRecu[this.currentIndexMessage].objet, [this.mesMessagesRecu[this.currentIndexMessage].auteur], this.reponseText, '');
    tmpMsg.reponse = this.mesMessagesRecu[this.currentIndexMessage].id;
    this.messageService.envoyerMessage(tmpMsg).then(
      () => {
        alert('envoyer avec succes');
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
        alert('envoyer avec succes');
      }
    );
  }

}
