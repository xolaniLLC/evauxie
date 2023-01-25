import { Component, OnInit } from '@angular/core';
import {CompanyService} from "../../services/company.service";
import {Company} from "../../models/company";
import firebase from "firebase";
import {Evenement} from "../../models/evenement";
import {EvenementService} from "../../services/evenement.service";
import {AuthentificationService} from "../../services/authentification.service";
import {ForumService} from "../../services/forum.service";
import {Topic} from "../../models/topic";
import {AvisCompanyService} from "../../services/avis-company.service";
import {AvisCompany} from "../../models/avis-company";
import {Message} from "../../models/message";
import {MessageService} from "../../services/message.service";
import {UserService} from "../../services/user.service";
import {Utilisateur} from "../../models/utilisateur";
import {Task} from "../../models/task";
import {TaskVendor} from "../../models/task-vendor";

@Component({
  selector: 'app-dashboard-vendor',
  templateUrl: './dashboard-vendor.component.html',
  styleUrls: ['./dashboard-vendor.component.scss']
})
export class DashboardVendorComponent implements OnInit {

  eventBooked: Evenement[] = [];
  currentCompany!: Company;
  listeTopics: Topic[] = [];
  nbAvisCompanyNotReponse = 0;
  messagesNonLus: any[] = [];
  currentUser: Utilisateur | any;
  liste_task_en_cours: TaskVendor[] = [];

  constructor(private userService: UserService, private messageService: MessageService, private avisCompanyService: AvisCompanyService, private forumService: ForumService, private authService: AuthentificationService, private eventService: EvenementService, private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.companyService.getCompanies().then(
      (docRef) => {
        for(let i=0; i<docRef.length; i++) {
          if(docRef[i].date) {
            this.currentCompany = docRef[i];
            const pointe = this;
            this.avisCompanyService.getAvisWitchIdCompany(this.currentCompany.id).then(
              (docRef) => {
                docRef.forEach(function (doc) {
                  if (!doc.reponseCompany)
                    pointe.nbAvisCompanyNotReponse++;
                });
              }
            );

            this.eventService.getMyEventsBooked(this.currentCompany.id).then(
              (data) => {
                this.eventBooked = data;
              }
            )
          }
        }
      }
    );

    /* Messages */
    this.messageService.getMesMessagesNonLus().then(
      (msg) => {
        this.messagesNonLus = msg;
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
}
