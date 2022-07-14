import { Component, OnInit } from '@angular/core';
import {Guest} from "../../models/guest";
import {EvenementService} from "../../services/evenement.service";
import firebase from "firebase";
import {AlertService} from "../../services/alert.service";
import {UserService} from "../../services/user.service";
import {Utilisateur} from "../../models/utilisateur";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-guests-lists',
  templateUrl: './guests-lists.component.html',
  styleUrls: ['./guests-lists.component.scss']
})
export class GuestsListsComponent implements OnInit {

  isLoading = false;
  currentEvent: Event | any = null;
  liste_invite: Guest[] = [];
  liste_profil_invite: Utilisateur[] = [];
  liste_invite_select: Guest[] = [];
  currentCategorySelect: number | any = null;
  menuOption = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  currentInviteUpdate: Guest | any = null;

  addGuestForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    state: new FormControl('')
  });

  constructor(private eventService: EvenementService, private alertService: AlertService, private userService: UserService) { }

  ngOnInit(): void {

    this.eventService.getMyEvents().then(
      (result) => {
        for(let i=0; i<result.length; i++) {
          if (result[i].etat === 1) {
            this.currentEvent = result[i];

            this.eventService.getGuestEvents(this.currentEvent.id).then(
              (result1) => {
                this.liste_invite = result1;
                const pointe = this;
                this.liste_invite.forEach(function (guest) {
                  pointe.userService.getInfosUserWitchId(guest.email).then(
                    (mimi) => {
                      if (mimi)
                        pointe.liste_profil_invite.push(mimi);
                      else
                        pointe.liste_profil_invite.push(new Utilisateur('', '', '', ''));
                    }
                  );
                });
              }
            );
          }
        }
      }
    );
  }

  cpte() {
    let tmpCmp = { attente: 0, valide: 0, decline: 0 };
    for(let i=0; i<this.liste_invite.length; i++) {
      if (this.liste_invite[i].etat === 0)
        tmpCmp.attente += 1;
      else if (this.liste_invite[i].etat === 1)
        tmpCmp.valide += 1;
      else
        tmpCmp.decline += 1;
    }
    return tmpCmp;
  }

  updateGuest(gt: Guest, newEtat: number) {
    this.isLoading = true;
    gt.etat = newEtat;
    this.eventService.updateGuest(gt).then(
      () => {
        this.isLoading = false;
        this.liste_invite.splice(this.liste_invite.indexOf(gt), 1);
        this.liste_invite.push(gt);
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  updateProfilGuest(form: any) {
    this.isLoading = true;
    let tmp = this.currentInviteUpdate;
    this.currentInviteUpdate.nom = form.value.nom;
    this.currentInviteUpdate.phone = form.value.phone;
    this.currentInviteUpdate.email = form.value.email;
    this.currentInviteUpdate.etat = Number(form.value.etat);
    this.eventService.updateGuest(this.currentInviteUpdate).then(
      () => {
        this.liste_invite.splice(this.liste_invite.indexOf(tmp), 1);
        this.liste_invite.push(this.currentInviteUpdate);
        this.currentInviteUpdate = null;
        this.modalUpdateHandler(false);
        this.isLoading = false;
        this.alertService.print('Operation done', 'success');
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  modalUpdateHandler(val: any) {
    let modal: any = document.getElementById("modalUpdate");
    if (val) {
      modal.classList.remove("hidden");
    } else {
      modal.classList.add("hidden");
    }
  }

  modalHandler(val: any) {
    let modal: any = document.getElementById("modal");
    if (val) {
      modal.classList.remove("hidden");
    } else {
      modal.classList.add("hidden");
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
