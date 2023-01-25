import { Component, OnInit } from '@angular/core';
import {MessageService} from "../services/message.service";
import {Message} from "../models/message";
import firebase from "firebase";
import {UserService} from "../services/user.service";
import {Utilisateur} from "../models/utilisateur";
import {AlertService} from "../services/alert.service";
import {WriteMailService} from "../services/write-mail.service";
import {CompanyService} from "../services/company.service";

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss']
})
export class MailboxComponent implements OnInit {
  isList: any;
  elementSelect: any[] = [];
  mesMessagesNonLu: Message[] = [];
  mesMessagesLu: Message[] = [];
  mesMessagesSend: Message[] = [];
  currentEmailUser: any = firebase.auth().currentUser?.email;
  msgNonLu = 0;
  currentIndexMessage = -1;
  reponseText = '';
  viewElement = 'inbox';
  viewTypeMessage = '';
  menuOption = '';
  currentUser: Utilisateur | any;
  isLoading = false;
  listeMessageSelect: Message[] = [];
  currentMessageOpen: Message | any;
  writeMail = false;

  constructor(private companyService: CompanyService, private writeMailService: WriteMailService, private messageService: MessageService, private userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {

    this.userService.getInfosUserWitchId(firebase.auth().currentUser?.email).then(
      (data) => {
        this.currentUser = data;
      }
    );

    this.messageService.getMesMessagesRecu().then(
      (result) => {
        for(let i=0; i<result.length; i++) {
          if(result[i].auteur === firebase.auth().currentUser?.email) {
            this.mesMessagesSend.push(result[i]);
          } else {
            if(result[i].read.includes(this.currentEmailUser)) {
              this.mesMessagesLu.push(result[i]);
            } else { this.mesMessagesNonLu.push(result[i]); }
          }
        }
      });
  }

  openWrite(dest: any, reponse: any) {
    this.writeMailService.new([dest], '', '', reponse);
  }

  checkAll(event: any) {
    if(this.elementSelect.length === (this.viewElement === 'inbox' ? this.mesMessagesLu.length : (this.viewElement === 'unread' ? this.mesMessagesNonLu.length : (this.viewElement === 'send' ? this.mesMessagesSend.length : 0)))) {
      this.elementSelect = [];
    } else {
      for(let i = 0; i < (this.viewElement === 'inbox' ? this.mesMessagesLu.length : (this.viewElement === 'unread' ? this.mesMessagesNonLu.length : (this.viewElement === 'send' ? this.mesMessagesSend.length : 0))); i++) {
        this.elementSelect.push((this.viewElement === 'inbox' ? this.mesMessagesLu[i].id : (this.viewElement === 'unread' ? this.mesMessagesNonLu[i].id : (this.viewElement === 'send' ? this.mesMessagesSend[i].id : null))));
      }
    }
  }

  getPureTexte(brute: any) {
    return brute.toString().replace(/<[^>]*>/g, '').replace('&nbsp;', '');
  }

  invalidBook(dest: any) {
    const tmp: Message = this.currentMessageOpen;
    tmp.objet = this.currentMessageOpen.objet.replace(this.currentMessageOpen.objet.slice(this.currentMessageOpen.objet.indexOf('#'), this.currentMessageOpen.objet.length), '(Reject)');
    this.messageService.updateMessage(tmp).then(
      () => {
        this.currentMessageOpen = tmp;
        this.writeMailService.new([this.currentMessageOpen.auteur], 'Impossible to accept your request', 'I could not accept this request because', this.currentMessageOpen.id);
      }
    );
  }

  validBook(idCompany: string, idEvent: string) {
    this.companyService.getCompanyWitchId(idCompany).then(
      (data) => {
        if(data.eventEnCours.includes(idEvent)) {
          this.alertService.print('Event already booked', 'warning');
        } else {
          data.eventEnCours.push(idEvent);
          this.companyService.updateCompany(data).then(
            () => {
              const tmp: Message = this.currentMessageOpen;
              tmp.objet = this.currentMessageOpen.objet.replace(this.currentMessageOpen.objet.slice(this.currentMessageOpen.objet.indexOf('#'), this.currentMessageOpen.objet.length), '(Reject)');
              this.messageService.updateMessage(tmp).then(
                () => {
                  this.currentMessageOpen = tmp;
                  this.alertService.print('Done', 'success');
                }
            );
            }
          );
        }
      }
    );
  }

  comptNombreOccurance(texte: string, caractere: string) {
    return texte.split(caractere).length - 1;
  }

  make_all_massage() {
    for(let i=0; i<this.listeMessageSelect.length; i++) {
      this.make_read_or_unread_message(this.listeMessageSelect[i]);
    }
  }

  make_read_or_unread_message(message: Message) {
    this.isLoading = true;
    message.read.includes(firebase.auth().currentUser?.email as string) ? message.read.push(firebase.auth().currentUser?.email as String | any) : message.read.splice(message.read.indexOf(firebase.auth().currentUser?.email as string), 1);
    this.messageService.updateMessage(message).then(
      () => {
        this.isLoading = false;
        this.alertService.print('Done', 'success');
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  markMessageCommeLu() {
    for(let i=0; i<this.elementSelect.length; i++) {
      for(let j=0; j<this.mesMessagesNonLu.length; j++) {
        if(this.mesMessagesNonLu[j].id === this.elementSelect[i].id) {
          this.updateReadMessage(this.mesMessagesNonLu[j]);
        }
      }
    }
  }

  markCurrentMessageRead() {
    if(!this.currentMessageOpen.read.includes(firebase.auth().currentUser?.email as string)) {
      const tmp = this.currentMessageOpen;
      tmp.read.push(firebase.auth().currentUser?.email as string);
      this.messageService.updateMessage(tmp).then();
    }
  }

  updateReadMessage(message: Message) {
    this.isLoading = true;
    message.read.push(firebase.auth().currentUser?.email as String | any);
    this.messageService.updateMessage(message).then(
      () => {
        this.isLoading = false;
        this.alertService.print('Done', 'success');
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
}
