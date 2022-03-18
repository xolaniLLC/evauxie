import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Utilisateur} from "../models/utilisateur";
import {AuthentificationService} from "../services/authentification.service";
import firebase from "firebase";
import {Evenement} from "../models/evenement";
import {EvenementService} from "../services/evenement.service";
import {Topic} from "../models/topic";
import {ForumService} from "../services/forum.service";
import {WriteMailService} from "../services/write-mail.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  currentUser: Utilisateur | any;
  userConnect: any = '';
  currentEvent: Evenement | any;
  liste_my_event: Evenement[] = [];
  liste_topics: Topic[] = [];
  liste_topics_like: Topic[] = [];
  menu = 1;
  onglet = 1;

  constructor(public writeMailService: WriteMailService, private forumService: ForumService, private eventService: EvenementService, private userService: UserService, private activatedRoute: ActivatedRoute, private authService: AuthentificationService) { }

  ngOnInit(): void {
    this.userService.getInfosUserWitchId(this.activatedRoute.snapshot.paramMap.get('id')).then(
      (result) => {
        const pointe = this;
        this.currentUser = result;

        this.eventService.getEventsWithIdUser(this.currentUser.email).then(
          (result) => {
            this.liste_my_event = result;
            this.liste_my_event.forEach(function (evt) {
              if (evt.etat === 1)
                pointe.currentEvent = evt;
            });
          }
        );

        this.forumService.getTopicsWitchIdUser(this.currentUser.email).then(
          (data) => {
            this.liste_topics = data;
          }
        );

        this.forumService.getLikeTopicWitchUserId(this.currentUser.email).then(
          (data) => {
            this.liste_topics_like = data;
          }
        );

        this.authService.isAuthenticated().then(
          (result1) => {
            if(result1)
              this.userConnect = firebase.auth().currentUser?.email;
          }
        );
      }
    );
  }

  getTimeRemaining (endtime: any) {
    const total = Date.parse (endtime) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000)% 60);
    const minutes = Math.floor((total / 1000/60)% 60);
    const heures = Math.floor((total / (1000 * 60 * 60))% 24);
    const jours = Math.floor (total / (1000 * 60 * 60 * 24));

    return  { total, jours, heures, minutes, seconds };
  }

}
