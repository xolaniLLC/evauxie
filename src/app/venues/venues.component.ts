import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../services/categories.service";
import {CategorieActivite} from "../models/categorie-activite";

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent implements OnInit {

  categorieVenues: CategorieActivite[] = [];
  categorieSelect = '318a527a244caec0556dae';

  constructor(private categorieService: CategoriesService) { }

  ngOnInit(): void {
    this.categorieService.getSousCategoriesActivites('318a527a244caec0556dae').then(
      (data) => {
        this.categorieVenues = data;
      }
    );
  }

}
