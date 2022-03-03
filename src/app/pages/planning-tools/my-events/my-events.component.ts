import { Component, OnInit } from '@angular/core';
import {EvenementService} from "../../../services/evenement.service";
import {Topic} from "../../../models/topic";
import firebase from "firebase";
import {Evenement} from "../../../models/evenement";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {

  view_form_event = false;
  liste_my_event: Evenement[] = [];
  event_en_cours: Evenement[] = [];

  constructor(private eventService: EvenementService) { }

  ngOnInit(): void {
    this.eventService.getMyEvents().then(
      (result) => {
        this.liste_my_event = result;
      }
    );
  }

  deleteMyEvent(event: Evenement) {
    this.eventService.deleteEvent(event).then(
      () => {
        alert('supprimer avec succes');
      }
    );
  }

  updateEtatEvent(event: Evenement) {

    if(event.etat === 0 && this.event_en_cours.length > 0) {
      alert('Currently, you can only define a current event');
    } else {
      if(event.etat === 0) { event.etat = 1; } else { event.etat = 0; }
      this.eventService.updateEvent(event).then(
        () => {
          alert('mis a jour avec succes');
        }
      );
    }
  }

  addMyEvent(form: any) {
    this.eventService.ajouterEvenement(new Evenement(form.value.titre, form.value.dateSelect, firebase.auth().currentUser?.email, form.value.categorie, this.liste_my_event.length === 0 ? 1 : 0, form.value.description)).then(
      () => {
        alert('ajouter avec succes');
      }
    );
  }

}
