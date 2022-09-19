import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {ActivatedRoute} from "@angular/router";
import {CategorieActivite} from "../../models/categorie-activite";
import {EvenementService} from "../../services/evenement.service";
import {AlertService} from "../../services/alert.service";
import {Evenement} from "../../models/evenement";

@Component({
  selector: 'app-vendors-manager',
  templateUrl: './vendors-manager.component.html',
  styleUrls: ['./vendors-manager.component.scss']
})
export class VendorsManagerComponent implements OnInit {

  categories: CategorieActivite[] = [];
  categorieSelect = '';
  currentTabSelect = 'liked';
  liste_my_event: Evenement[] = [];
  event_en_cours: Evenement | any;
  typePrint = 'images';
  isLoading = false;

  constructor(private eventService: EvenementService, private alertService: AlertService, private categorieService: CategoriesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.eventService.getMyEvents().then(
      (result) => {
        this.liste_my_event = result;
        const pointe = this;
        this.liste_my_event.forEach(function (evt) {
          if (evt.etat === 1) {
            pointe.event_en_cours = evt;
          }
        });
      }
    );


    if(this.activatedRoute.snapshot.queryParams['categorie'])
      this.categorieSelect = this.activatedRoute.snapshot.queryParams['categorie'];
    if(this.activatedRoute.snapshot.queryParams['pays'])
      this.categorieSelect = this.activatedRoute.snapshot.queryParams['pays'];
    if(this.activatedRoute.snapshot.queryParams['textSearch'])
      this.categorieSelect = this.activatedRoute.snapshot.queryParams['textSearch'];

    this.categorieService.getAllCategoriesActivites().then(
      (data) => {
        this.categories = data;
      }
    );
  }

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
