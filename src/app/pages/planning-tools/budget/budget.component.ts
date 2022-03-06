import { Component, OnInit } from '@angular/core';
import {EvenementService} from "../../../services/evenement.service";
import {Evenement} from "../../../models/evenement";
import {Depense} from "../../../models/depense";
import firebase from "firebase";

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  currentEvent: Evenement | any = null;
  newEstimateBudget = 0;
  depenses: Depense[] = [];
  categorieSelect = '';
  ce = 0; cf = 0; pa = 0;
  currentDepenseUpdate: Depense | any = null;

  constructor(private eventService: EvenementService) { }

  ngOnInit(): void {
    const p = this;
    this.eventService.getMyEvents().then(
      (result) => {
        result.forEach(function (evt) {
          if (evt.etat === 1) {
            p.currentEvent = evt;
            p.newEstimateBudget = evt.estimationBudget;
          }
        });

        this.eventService.getDepenseEvents(this.currentEvent.id).then(
          (result) => {
            this.depenses = result;
            result.forEach(function (dep) {
              p.ce += dep.coutEstime;
              p.cf += dep.coutFinal;
              p.pa += dep.paye;
            });
          }
        );
      }
    );
  }

  deleteDepense(dep: Depense) {
    this.eventService.deleteDepense(dep).then(
      () => {
        //alert('effectué avec succes');
        this.ngOnInit();
      }
    );
  }

  addDepense(form: any) {
    const tmp = new Depense(this.currentEvent.id, form.value.titre, firebase.auth().currentUser?.email, form.value.categorie);
    if(form.value.coutEstime) { tmp.coutEstime = form.value.coutEstime }
    if(form.value.coutFinal) { tmp.coutFinal = form.value.coutFinal }
    if(form.value.paye) { tmp.paye = form.value.paye }
    this.eventService.ajouterDepense(tmp).then(
      () => {
        //alert('effectué avec succes');
        this.ngOnInit();
      }
    );
  }

  saveNewEstimatBudget() {
    this.currentEvent.estimationBudget = this.newEstimateBudget;
    this.eventService.updateEvent(this.currentEvent).then(
      () => {
        //alert('effectué avec succes');
      }
    );
  }

}
