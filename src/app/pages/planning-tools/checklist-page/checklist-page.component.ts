import { Component, OnInit } from '@angular/core';
import {EvenementService} from "../../../services/evenement.service";
import {Evenement} from "../../../models/evenement";
import firebase from "firebase";
import {Task} from "../../../models/task";

@Component({
  selector: 'app-checklist-page',
  templateUrl: './checklist-page.component.html',
  styleUrls: ['./checklist-page.component.scss']
})
export class ChecklistPageComponent implements OnInit {

  view_form_task = false;
  currentEvent: Evenement | any;
  liste_task: Task[] = [];
  liste_task_effectuer: Task[] = [];
  liste_task_non_effectuer: Task[] = [];

  constructor(private eventService: EvenementService) { }

  ngOnInit(): void {
    this.eventService.getMyEvents().then(
      (result) => {
        for(let i=0; i<result.length; i++) {
          if (result[i].etat === 1) {
            this.currentEvent = result[i];

            this.eventService.getTaskEvents(this.currentEvent.id).then(
              (result1) => {
                this.liste_task = result1;
                for(let j=0; j<this.liste_task.length; j++){
                  if(this.liste_task[j].etat === 1) {
                    this.liste_task_effectuer.push(this.liste_task[j]);
                  } else { this.liste_task_non_effectuer.push(this.liste_task[j]); }
                }
              }
            );
          }
        }
      }
    );
  }

  deleteTask(task: Task) {
    this.eventService.deleteTask(task).then(
      () => {
        //alert('supprimer avec succes');
        this.ngOnInit();
      }
    );
  }

  updateEtatEvent(task: Task) {
    if(task.etat === 0) { task.etat = 1; } else { task.etat = 0; }
    this.eventService.updateTask(task).then(
      () => {
        //alert('mis a jour avec succes');
        this.ngOnInit();
      }
    );
  }

  getNombreJoursRestant(date: any) {
    const date1 = new Date();
    const date2 = new Date(date);
    const Diff_temps = date2.getTime() - date1.getTime();
    return Math.trunc(Diff_temps / (1000 * 3600 * 24));
  }

  addTask(form: any) {
    this.eventService.ajouterTache(new Task(this.currentEvent.id, form.value.titre, form.value.date, firebase.auth().currentUser?.email, form.value.categorie, 0, form.value.description, form.value.sommes)).then(
      () => {
        //alert('ajouter avec succes');
        this.ngOnInit();
      }
    );
  }

}
