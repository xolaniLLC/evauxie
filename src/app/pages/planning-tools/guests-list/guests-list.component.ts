import { Component, OnInit } from '@angular/core';
import {Evenement} from "../../../models/evenement";
import firebase from "firebase";
import {EvenementService} from "../../../services/evenement.service";
import {Guest} from "../../../models/guest";

@Component({
  selector: 'app-guests-list',
  templateUrl: './guests-list.component.html',
  styleUrls: ['./guests-list.component.scss']
})
export class GuestsListComponent implements OnInit {

  currentEvent: Evenement | any;
  liste_invite: Guest[] = [];
  liste_invite_en_attente: Guest[] = [];
  liste_invite_declined: Guest[] = [];
  liste_invite_accepted: Guest[] = [];
  liste_invite_select: Guest[] = [];
  liste_email_invite: string[] = [];
  vue = -2;

  constructor(private eventService: EvenementService) { }

  ngOnInit(): void {
    this.eventService.getMyEvents().then(
      (result) => {
        for(let i=0; i<result.length; i++) {
          if (result[i].etat === 1) {
            this.currentEvent = result[i];

            this.eventService.getGuestEvents(this.currentEvent.id).then(
              (result1) => {
                this.liste_invite = result1;
                for(let j=0; j<this.liste_invite.length; j++){
                  if(this.liste_invite[j].etat === 1) {
                    this.liste_invite_accepted.push(this.liste_invite[j]);
                  } else if(this.liste_invite[j].etat === 0) {
                    this.liste_invite_en_attente.push(this.liste_invite[j]); this.liste_email_invite.push(this.liste_invite[j].email);
                  } else { this.liste_invite_declined.push(this.liste_invite[j]); }
                }
              }
            );
          }
        }
      }
    );
  }

  deleteGuestSelect() {
    for(let i=0; i<this.liste_invite_select.length; i++){
      this.eventService.deleteGuest(this.liste_invite_select[i]);
    }
    this.ngOnInit();
  }

  addGuest(form: any) {
    this.eventService.ajouterInvite(new Guest(this.currentEvent.id, form.value.nom, firebase.auth().currentUser?.email, Number(form.value.etat), form.value.email)).then(
      () => {
        //alert('ajouter avec succes');
        this.ngOnInit();
      }
    );
  }

}
