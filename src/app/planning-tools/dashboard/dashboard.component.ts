import { Component, OnInit } from '@angular/core';
import {Evenement} from "../../models/evenement";
import {AuthentificationService} from "../../services/authentification.service";
import {ForumService} from "../../services/forum.service";
import {EvenementService} from "../../services/evenement.service";
import {AlertService} from "../../services/alert.service";
import {Task} from "../../models/task";
import {Topic} from "../../models/topic";
import firebase from "firebase";
import {Utilisateur} from "../../models/utilisateur";
import {Guest} from "../../models/guest";
import {UserService} from "../../services/user.service";
import {Depense} from "../../models/depense";
import {CompanyService} from "../../services/company.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  liste_my_event: Evenement[] = [];
  event_en_cours: Evenement | any;
  isLoading = false;
  menuOption = '';
  depenses: Depense[] = [];
  list_event_select: Evenement[] = [];

  currentUser: Utilisateur | any;

  liste_task_en_cours: Task[] = [];
  liste_guest_en_cours: Guest[] = [];
  liste_profil_invite: Utilisateur[] = [];
  listeTopics: Topic[] = [];
  companyBooked: string[] = [];

  constructor(private companyService: CompanyService, private userService: UserService, private authService: AuthentificationService, private forumService: ForumService, private eventService: EvenementService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.eventService.getMyEvents().then(
      (result) => {
        this.liste_my_event = result;
        const pointe = this;
        this.liste_my_event.forEach(function (evt) {
          if (evt.etat === 1) {
            pointe.event_en_cours = evt as Evenement;

            pointe.event_en_cours.companySollicite.forEach(function (dc: any) {
              pointe.companyService.getCompanyWitchId(dc).then(
                (data) => {
                  if(data.eventEnCours.includes(pointe.event_en_cours.id)) {
                    pointe.companyBooked.push(data.id);
                  }
                }
              );
            });

            pointe.eventService.getTaskEvents(evt.id).then(
              (data) => {
                data.forEach(function (task) {
                  if(task.etat === '') {
                    pointe.liste_task_en_cours.push(task);
                  }
                });
              }
            );

            pointe.eventService.getDepenseEvents(evt.id).then(
              (result) => {
                pointe.depenses = result;
              }
            );

            pointe.eventService.getGuestEvents(evt.id).then(
              (result1) => {
                result1.forEach(function (guest) {
                  if(guest.etat === 1) {
                    pointe.liste_guest_en_cours.push(guest);
                    pointe.userService.getInfosUserWitchId(guest.email).then(
                      (mimi) => {
                        if (mimi)
                          pointe.liste_profil_invite.push(mimi);
                        else
                          pointe.liste_profil_invite.push(new Utilisateur('', '', '', ''));
                      }
                    );
                  }
                });
              }
            );
          }
        });
      }
    );


    /* Topic */
    this.authService.isAuthenticated().then(
      (data) => {
        if(data) {
          this.forumService.getTopicsWitchIdUser(firebase.auth().currentUser?.email).then(
            (result) => {
              this.listeTopics = result;
            }
          );
          this.userService.getInfosUserWitchId(firebase.auth().currentUser?.email).then(
            (donnee) => {
              this.currentUser = donnee;
            }
          );
        }
      }
    );
    /* Fin Topic */
  }

  recupTotalDepense() {
    let result: any = {fc: 0, pd: 0, ec: 0};
    for(let i=0; i<this.depenses.length; i++) {
      result.fc += Number(this.depenses[i].coutFinal);
      result.pd += Number(this.depenses[i].paye);
      result.ec += Number(this.depenses[i].coutEstime);
    }
    return result;
  }

  /* TASK */
  deleteTask(task: Task) {
    this.isLoading = true;
    this.eventService.deleteTask(task).then(
      () => {
        this.isLoading = false;
        this.alertService.print('Done', 'success');
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
    this.eventService.updateTask(task).then(
      () => {
        this.isLoading = false;
        this.liste_task_en_cours.splice(this.liste_task_en_cours.indexOf(task), 1);
        this.alertService.print('Done', 'success');
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  /* Fin TASK */

  /* Budget */

  saveNewEstimatBudget(somme: any) {
    this.isLoading = true;
    this.event_en_cours.estimationBudget = somme;
    this.eventService.updateEvent(this.event_en_cours).then(
      () => {
        this.isLoading = false;
        this.alertService.print('Done', 'success');
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }
  /* Fin Budget */

  updateEtatEvent(event: Evenement, company: string, etat: string) {
    this.isLoading = true;
    if(etat === 'hired') { event.companySollicite.push(company); } else { event.companySollicite.splice(event.companySollicite.indexOf(company), 1); }
    this.eventService.updateEvent(event).then(
      () => {
        this.isLoading = false;
        this.event_en_cours = event;
        //location.reload();
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

}
