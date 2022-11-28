import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import {EvenementService} from "../../services/evenement.service";
import {Evenement} from "../../models/evenement";
import {AlertService} from "../../services/alert.service";
import {Task} from "../../models/task";
import {ForumService} from "../../services/forum.service";
import {Topic} from "../../models/topic";
import {AuthentificationService} from "../../services/authentification.service";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {

  liste_my_event: Evenement[] = [];
  event_en_cours: Evenement | any;
  isLoading = false;
  menuOption = '';
  list_event_select: Evenement[] = [];

  liste_task_en_cours: Task[] = [];
  listeTopics: Topic[] = [];

  constructor(private authService: AuthentificationService, private forumService: ForumService, private eventService: EvenementService, private alertService: AlertService) { }

  ngOnInit(): void {

    this.eventService.getMyEvents().then(
      (result) => {
        this.liste_my_event = result;
        const pointe = this;
        this.liste_my_event.forEach(function (evt) {
          if (evt.etat === 1) {
            pointe.event_en_cours = evt as Evenement;
          }
        });
      }
    );
  }

  deleteAll() {
    if (confirm('Do you really want to remove these elements?')) {
      for(let i=0; i<this.list_event_select.length; i++) {
        this.deleteMyEvent(this.list_event_select[i]);
      }
    } else {
      this.alertService.print('Operation cancelled', 'warning');
    }
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

  deleteMyEvent(event: Evenement) {
    this.isLoading = true;
    this.eventService.deleteEvent(event).then(
      () => {
        this.isLoading = false;
        this.liste_my_event.splice(this.liste_my_event.indexOf(event), 1);
        this.event_en_cours.splice(this.event_en_cours.indexOf(event), 1);
        this.list_event_select.splice(this.list_event_select.indexOf(event), 1)
        this.alertService.print('Operation done', 'success');
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  updateEtatEvent(event: Evenement) {
    if(event.etat === 0 && this.event_en_cours.length > 0) {
      this.alertService.print('Currently, you can only define a current event', 'warning');
    } else {
      this.isLoading = true;
      const oldEvent = event;
      if(event.etat === 0) { event.etat = 1; } else { event.etat = 0; }
      this.eventService.updateEvent(event).then(
        () => {
          this.isLoading = false;
          location.reload();
        }, (error) => {
          this.isLoading = false;
          this.alertService.print(error, 'danger');
        }
      );
    }
  }

  addMyEvent(form: any) {
    this.isLoading = true;
    const tmp = new Evenement(form.value.titre, form.value.dateSelect, firebase.auth().currentUser?.email, ' ', this.liste_my_event.length === 0 ? 1 : 0, form.value.description);
    this.eventService.ajouterEvenement(tmp).then(
      () => {
        this.alertService.print('Operation successfully completed', 'success');
        this.isLoading = false;
        this.liste_my_event.push(tmp);
        if (tmp.etat === 1) { this.event_en_cours.push(tmp); }
        this.modalHandler(false);
      }, (error) => {
        this.alertService.print(error, 'danger');
        this.isLoading = false;
      }
    );
  }

}
