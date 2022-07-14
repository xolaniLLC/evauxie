import { Component, OnInit } from '@angular/core';
import {Evenement} from "../../models/evenement";
import {Depense} from "../../models/depense";
import {AlertService} from "../../services/alert.service";
import {EvenementService} from "../../services/evenement.service";
import firebase from "firebase";

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  isLoading = false;
  currentEvent: Evenement | any = null;
  depenses: Depense[] = [];
  depenses_select: Depense[] = [];
  currentCategorySelect = '';
  ce = 0; cf = 0; pa = 0;
  currentDepenseUpdate: Depense | any = null;
  menuOption = '';
  printResumeBudget = true;
  subList = 3;
  modal: boolean = true;

  constructor(private eventService: EvenementService, private alertService: AlertService) { }

  ngOnInit(): void {
    const p = this;
    this.eventService.getMyEvents().then(
      (result) => {
        result.forEach(function (evt) {
          if (evt.etat === 1) {
            p.currentEvent = evt;
          }
        });

        this.eventService.getDepenseEvents(this.currentEvent.id).then(
          (result) => {
            this.depenses = result;
          }
        );
      }
    );
  }

  modalUpdateBtn(){
    this.modal=!this.modal
  }

  rve(nombre: number, nombre_total: number) {
    return Math.trunc(Number(nombre) * 100 / Number(nombre_total));
  }

  recupTotalDepense() {
    let result: any = {fc: 0, pd: 0, ec: 0};
    for(let i=0; i<this.depenses.length; i++) {
      if(this.depenses[i].categorie === this.currentCategorySelect || this.currentCategorySelect === '') {
        result.fc += Number(this.depenses[i].coutFinal);
        result.pd += Number(this.depenses[i].paye);
        result.ec += Number(this.depenses[i].coutEstime);
      }
    }
    return result;
  }

  deleteAll() {
    if (confirm('Do you really want to remove these elements?')) {
      for(let i=0; i<this.depenses_select.length; i++) {
        this.deleteDepense(this.depenses_select[i]);
      }
    } else {
      this.alertService.print('Operation cancelled', 'warning');
    }
  }

  deleteDepense(dep: Depense) {
    this.isLoading = true;
    this.eventService.deleteDepense(dep).then(
      () => {
        this.isLoading = false;
        this.depenses.splice(this.depenses.indexOf(dep), 1);
        this.alertService.print('Operation done', 'success');
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  addDepense(form: any) {
    this.isLoading = true;
    const tmp = new Depense(this.currentEvent.id, form.value.titre, firebase.auth().currentUser?.email, form.value.categorie);
    if(form.value.coutEstime) { tmp.coutEstime = form.value.coutEstime }
    if(form.value.coutFinal) { tmp.coutFinal = form.value.coutFinal }
    if(form.value.paye) { tmp.paye = form.value.paye }
    this.eventService.ajouterDepense(tmp).then(
      () => {
        this.depenses.push(tmp);
        this.isLoading = false;
        this.modalHandler(false);
        this.alertService.print('Operation done', 'success');
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
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

  updateDepense(form: any) {
    this.isLoading = true;
    let tmp = this.currentDepenseUpdate;
    tmp.titre = form.value.titre;
    tmp.coutEstime = form.value.coutEstime;
    tmp.coutFinal = form.value.coutFinal;
    tmp.categorie = form.value.categorie;
    //tmp.paye = form.value.paye;
    this.eventService.updateDepense(tmp).then(
      () => {
        this.depenses.splice(this.depenses.indexOf(this.currentDepenseUpdate), 1);
        this.depenses.push(tmp);
        this.currentDepenseUpdate = null;
        this.modalUpdateBtn();
        this.isLoading = false;
        this.alertService.print('Operation done', 'success');
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  saveNewEstimatBudget(somme: any) {
    this.isLoading = true;
    this.currentEvent.estimationBudget = somme;
    this.eventService.updateEvent(this.currentEvent).then(
      () => {
        this.isLoading = false;
        this.alertService.print('Operation done', 'success');
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }
}
