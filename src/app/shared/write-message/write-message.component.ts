import {Component, OnInit} from '@angular/core';
import {Message} from "../../models/message";
import firebase from "firebase";
import {MessageService} from "../../services/message.service";
import {AlertService} from "../../services/alert.service";
import {WriteMailService} from "../../services/write-mail.service";
import {Router} from "@angular/router";

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

  constructor(private router: Router, private messageService: MessageService, private alertService: AlertService, public writeMailService: WriteMailService) { }

  ngOnInit(): void {
  }

  getContenuMessage(id: string) {
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

  sendMessage(form: any, reponse?: string) {
    this.isLoading = true;
    const tmpDest = form.value.destinataires.split(',');
    const tmpFdest = [];
    for(let i=0; i < tmpDest.length; i++) {
      tmpFdest.push(tmpDest[i].trim());
    }
    let tmpMsg = new Message(firebase.auth().currentUser?.email, form.value.objet, tmpFdest, form.value.message, '');
    if(reponse) { tmpMsg.reponse = reponse; }
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

}
