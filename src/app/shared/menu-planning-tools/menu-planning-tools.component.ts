import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Evenement} from "../../models/evenement";
import {Utilisateur} from "../../models/utilisateur";
import firebase from "firebase";
import {UserService} from "../../services/user.service";
import {EvenementService} from "../../services/evenement.service";

@Component({
  selector: 'app-menu-planning-tools',
  templateUrl: './menu-planning-tools.component.html',
  styleUrls: ['./menu-planning-tools.component.scss']
})
export class MenuPlanningToolsComponent implements OnInit {

  isList: any;
  isMenu: boolean = false;
  isSearch: boolean = false;
  menu = 0;
  event_en_cours: Evenement[] = [];
  currentUser: Utilisateur | any;
  liste_my_event: Evenement[] = [];

  constructor(private router: Router, private userService: UserService, private eventService: EvenementService) {
  }

  ngOnInit(): void {
    if(this.router.url.includes('my-events')) {
      this.menu = 1;
    } else if(this.router.url.includes('checklist')) {
      this.menu = 2;
    } else if(this.router.url.includes('vendors')) {
      this.menu = 3;
    } else if(this.router.url.includes('guest')) {
      this.menu = 4;
    } else if(this.router.url.includes('budget')) {
      this.menu = 5;
    }

    this.userService.getInfosUserWitchId(firebase.auth().currentUser?.email as string).then(
      (rep) => {
        if(rep) {
          this.currentUser = rep;
        }
      }
    );
    this.eventService.getMyEvents().then(
      (result) => {
        this.liste_my_event = result;
        const pointe = this;
        this.liste_my_event.forEach(function (evt) {
          if (evt.etat === 1)
            pointe.event_en_cours.push(evt as Evenement);
        });
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
