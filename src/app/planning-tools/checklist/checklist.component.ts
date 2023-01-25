import { Component, OnInit } from '@angular/core';
import {EvenementService} from "../../services/evenement.service";
import {Evenement} from "../../models/evenement";
import {Task} from "../../models/task";
import firebase from "firebase";
import {AlertService} from "../../services/alert.service";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {

  isLoading = false;
  currentCategorySelect = '';
  liste_my_event: Evenement[] = [];
  event_en_cours: Evenement[] = [];
  liste_task: Task[] = [];
  menuOption = '';

  constructor(private eventService: EvenementService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.eventService.getMyEvents().then(
      (result) => {
        this.liste_my_event = result;
        const pointe = this;
        this.liste_my_event.forEach(function (evt) {
          if (evt.etat === 1) {
            pointe.event_en_cours.push(evt as Evenement);
            pointe.liste_task = [];
            pointe.eventService.getTaskEvents(evt.id).then(
              (data) => {
                pointe.liste_task = data;
              }
            );
          }
        });
      }
    );
  }

  cpte() {
    let tmpCmp = 0;
    for(let i=0; i<this.liste_task.length; i++) {
      if (this.liste_task[i].etat !== '')
        tmpCmp += 1;
    }
    return Math.trunc(tmpCmp * 100 / this.liste_task.length);
  }

  downloadPage() {
    let data = document.getElementById('tableau_doc');
    html2canvas(data as any).then(canvas => {
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdfData = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdfData.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdfData.save('Evauxie-CheckList-' + this.event_en_cours[0].titre + '.pdf');
    });
  }

  printDoc() {
    const printContent: any = document.getElementById("tableau_doc");
    const WindowPrt: any = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

  deleteTask(task: Task) {
    this.isLoading = true;
    this.eventService.deleteTask(task).then(
      () => {
        this.isLoading = false;
        this.alertService.print('Done', 'success');
        this.liste_task.splice(this.liste_task.indexOf(task), 1);
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  updateEtatTask(task: Task) {
    this.isLoading = true;
    if(task.etat === '') { task.etat = (new Date()).toString(); } else { task.etat = ''; }
    this.eventService.updateTask(task).then(
      () => {
        this.isLoading = false;
        this.alertService.print('Done', 'success');
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  addTask(form: any) {
    this.isLoading = true;
    const tmp = new Task(this.event_en_cours[0].id, form.value.titre, form.value.date, firebase.auth().currentUser?.email, ' ', '', form.value.description, 0);
    this.eventService.ajouterTache(tmp).then(
      () => {
        this.isLoading = false;
        this.alertService.print('Done', 'success');
        this.liste_task.push(tmp);
        this.modalHandler(false);
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

}
