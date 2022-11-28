import { Component, OnInit } from '@angular/core';
import {CompanyService} from "../../services/company.service";
import {Company} from "../../models/company";
import {EvenementService} from "../../services/evenement.service";
import {Evenement} from "../../models/evenement";
import {Utilisateur} from "../../models/utilisateur";
import {UserService} from "../../services/user.service";
import {WriteMailService} from "../../services/write-mail.service";
import {TaskVendor} from "../../models/task-vendor";
import firebase from "firebase";
import {Task} from "../../models/task";
import {AlertService} from "../../services/alert.service";
import {DetailEvent} from "../../models/detail-event";

@Component({
  selector: 'app-booking-manager',
  templateUrl: './booking-manager.component.html',
  styleUrls: ['./booking-manager.component.scss']
})
export class BookingManagerComponent implements OnInit {

  sousmenu = 0;
  currentCompany: Company | any = null;
  eventBooked: Evenement[] = [];
  userBooked: Utilisateur[] = [];
  liste_task_en_cours: TaskVendor[] = [];
  isLoading = false;
  currentIdEventSelect: string | any;
  detailsEvent: DetailEvent[] = [];

  constructor(private alertService: AlertService, private writeMailService: WriteMailService, private companyService: CompanyService, private eventService: EvenementService, private userService: UserService) { }

  ngOnInit(): void {
    this.companyService.getCompanies().then(
      (docRef) => {
        for(let i=0; i<docRef.length; i++) {
          if(docRef[i].date) {
            this.currentCompany = docRef[i];

            this.eventService.getMyEventsBooked(this.currentCompany.id).then(
              (data) => {
                this.eventBooked = data;
                const pointe = this;
                data.forEach(function (doc) {
                  pointe.userService.getInfosUserWitchId(doc.auteur).then(
                    (donnee) => {
                      pointe.userBooked.push(donnee);
                    }
                  );
                });
              }
            );

            this.eventService.getTaskEventsVendor(firebase.auth().currentUser?.email!).then(
              (data25) => {
                this.liste_task_en_cours = data25;
              }
            );

            this.eventService.getDetailEventsVendor(firebase.auth().currentUser?.email!).then(
              (data26) => {
                this.detailsEvent = data26;
              }
            );
          }
        }
      }
    );
  }

  requestPrice(destinataire: string) {
    this.writeMailService.new(destinataire, '', '', '');
  }

  /* TASK */
  deleteTask(task: Task) {
    this.isLoading = true;
    this.eventService.deleteTaskVendor(task).then(
      () => {
        this.isLoading = false;
        this.alertService.print('Operation done', 'success');
        this.liste_task_en_cours.splice(this.liste_task_en_cours.indexOf(task), 1);
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  updateEtatTask(task: Task) {
    this.isLoading = true;
    if(task.etat === '') { task.etat = (new Date()).toString(); } else { task.etat = ''; }
    this.eventService.updateTaskVendor(task).then(
      () => {
        this.isLoading = false;
        this.liste_task_en_cours.splice(this.liste_task_en_cours.indexOf(task), 1);
        this.alertService.print('Operation done', 'success');
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  addTask(form: any) {
    this.isLoading = true;
    const tmp = new TaskVendor(this.currentIdEventSelect, form.value.titre, form.value.date, firebase.auth().currentUser?.email, ' ', '', form.value.description, 0);
    this.eventService.ajouterTacheVendeur(tmp).then(
      () => {
        this.isLoading = false;
        this.alertService.print('Operation done', 'success');
        this.liste_task_en_cours.push(tmp);
        this.modalHandler(false);
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  modalHandler(val: any) {
    let modal: any = document.getElementById("modal");
    if (val) {
      modal.classList.remove("hidden");
    } else {
      modal.classList.add("hidden");
    }
  }

  modalHandler2(val: any) {
    let modal: any = document.getElementById("modal2");
    if (val) {
      modal.classList.remove("hidden");
    } else {
      modal.classList.add("hidden");
    }
  }

  /* Detail */
  addDetail(form: any) {
    this.isLoading = true;
    const tmp = new DetailEvent(this.currentIdEventSelect, form.value.title, firebase.auth().currentUser?.email, ' ', '', form.value.descrip);
    this.eventService.ajouterDetail(tmp).then(
      () => {
        this.isLoading = false;
        this.alertService.print('Operation done', 'success');
        this.detailsEvent.push(tmp);
        this.modalHandler2(false);
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  deleteDetail(detail: DetailEvent) {
    this.isLoading = true;
    this.eventService.deleteDetailEvent(detail).then(
      () => {
        this.isLoading = false;
        this.alertService.print('Operation done', 'success');
        this.detailsEvent.splice(this.detailsEvent.indexOf(detail), 1);
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

}
