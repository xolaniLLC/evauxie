import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../services/categories.service";
import {CategorieActivite} from "../models/categorie-activite";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent implements OnInit {

  categorieVenues: CategorieActivite[] = [];
  categorieSelect = '';
  paysSelect = '';
  textSearch = '';

  constructor(private categorieService: CategoriesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.queryParams['categorie'])
      this.categorieSelect = this.activatedRoute.snapshot.queryParams['categorie'];
    if(this.activatedRoute.snapshot.queryParams['pays'])
      this.categorieSelect = this.activatedRoute.snapshot.queryParams['pays'];
    if(this.activatedRoute.snapshot.queryParams['textSearch'])
      this.categorieSelect = this.activatedRoute.snapshot.queryParams['textSearch'];

    this.categorieService.getSousCategoriesActivites('318a527a244caec0556dae').then(
      (data) => {
        this.categorieVenues = data;
        if(this.categorieSelect === '') { this.categorieSelect = this.categorieVenues[0].id; }
      }
    );
  }

}
