import { Component, OnInit } from '@angular/core';
import {Guest} from "../../models/guest";
import {EvenementService} from "../../services/evenement.service";
import firebase from "firebase";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-guests-lists',
  templateUrl: './guests-lists.component.html',
  styleUrls: ['./guests-lists.component.scss']
})
export class GuestsListsComponent implements OnInit {

  isLoading = false;
  currentEvent: Event | any = null;
  liste_invite: Guest[] = [];
  liste_invite_select: Guest[] = [];
  currentCategorySelect: number | any = null;
  menuOption = '';

  constructor(private eventService: EvenementService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.eventService.getMyEvents().then(
      (result) => {
        for(let i=0; i<result.length; i++) {
          if (result[i].etat === 1) {
            this.currentEvent = result[i];

            this.eventService.getGuestEvents(this.currentEvent.id).then(
              (result1) => {
                this.liste_invite = result1;
              }
            );
          }
        }
      }
    );
  }

  cpte() {
    let tmpCmp = 0;
    for(let i=0; i<this.liste_invite.length; i++) {
      if (this.liste_invite[i].etat === 0)
        tmpCmp += 1;
    }
    return Math.trunc(tmpCmp * 100 / this.liste_invite.length);
  }

  updateGuest(gt: Guest, newEtat: number) {
    this.isLoading = true;
    gt.etat = newEtat;
    this.eventService.updateGuest(gt).then(
      () => {
        this.isLoading = false;
        this.liste_invite.splice(this.liste_invite.indexOf(gt), 1);
        this.liste_invite.push(gt);
      }
    );
  }

  modalHandler(val: any) {
    let modal: any = document.getElementById("modal");
    let button: any = document.getElementById("button");
    if (val) {
      modal.classList.remove("hidden");
      button.classList.add("hidden");
    } else {
      modal.classList.add("hidden");
      button.classList.remove("hidden");
    }
  }

  deleteAll() {
    if (confirm('Do you really want to remove these elements?')) {
      for(let i=0; i<this.liste_invite_select.length; i++) {
        this.deleteGuestSelect(this.liste_invite_select[i]);
      }
    } else {
      this.alertService.print('Operation cancelled', 'warning');
    }
  }

  deleteGuestSelect(gt: Guest) {
    this.isLoading = true;
    this.eventService.deleteGuest(gt).then(
      () => {
        this.isLoading = false;
        this.liste_invite.splice(this.liste_invite.indexOf(gt), 1);
        this.liste_invite_select.splice(this.liste_invite_select.indexOf(gt), 1)
        this.alertService.print('Operation done', 'success');
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  addGuest(form: any) {
    this.isLoading = true;
    const tmp = new Guest(this.currentEvent.id, form.value.nom, firebase.auth().currentUser?.email, Number(form.value.etat), form.value.email, form.value.phone);
    this.eventService.ajouterInvite(tmp).then(
      () => {
        this.isLoading = false;
        this.alertService.print('Operation done', 'success');
        this.liste_invite.push(tmp);
        this.modalHandler(false);
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

}
