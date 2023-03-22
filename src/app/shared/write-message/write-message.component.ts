import {Component, OnInit} from '@angular/core';
import {Message} from "../../models/message";
import firebase from "firebase";
import {MessageService} from "../../services/message.service";
import {AlertService} from "../../services/alert.service";
import {WriteMailService} from "../../services/write-mail.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.scss']
})
export class WriteMessageComponent implements OnInit {

  isLoading = false;
  oldUrl = '';
  printDetailReponse = false;
  reponseContenu: any = null;

  constructor(private translate: TranslateService, private router: Router, private messageService: MessageService, private alertService: AlertService, public writeMailService: WriteMailService) { }

  ngOnInit(): void {
  }

  isBooking(text: string) {
    let result = false;
    if((text.split('#').length - 1) > 1 && text.includes('@')) {
      result = true;
    }
    return result;
  }

  async getContenuMessage(id: string) {
    this.messageService.getMessageWitchId(id).then(
      (result) => {
        this.reponseContenu = result;
      }
    );
  }

  public closeModal(i: number) {
    let p = this;
    let notification: any = document.getElementById("modal_" + i);
    notification.style.transform = "translateX(150%)";
    setTimeout(function () {
      p.writeMailService.deleteModal(i);
    }, 1000);
  }

  sendMessage(form: any, index: number, reponse?: string, modalWrite?: any) {
    this.isLoading = true;
    let messageCombine = modalWrite.message === ':form-booking' ? (form.value.descriptionService + '<br><br>' + 'Date : ' + form.value.dateDelivery + '<br><br>' + form.value.agreedPriceOfService) : form.value.message;
    let tmpMsg = new Message(firebase.auth().currentUser?.email, form.value.objet, form.value.destinataires, messageCombine, '');
    if(reponse) { tmpMsg.reponse = reponse; }
    this.messageService.envoyerMessage(tmpMsg).then(
      () => {
        this.isLoading = false;
        this.closeModal(index);
        this.alertService.print('Done', 'success');
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  getValueTraduct(texte: string, langue: string = '') {
    const wrapper = document.createElement('div');
    wrapper.innerHTML= texte;
    return wrapper.getElementsByTagName(langue ? langue : this.translate.defaultLang).length > 0 ? wrapper.getElementsByTagName(langue ? langue : this.translate.defaultLang)[0].innerHTML.replace('amp;', '')  : (texte && texte.includes('</') ? '' : texte);
  }

}
