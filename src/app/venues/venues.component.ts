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
  affordbilitySelect = '';
  townSelect = '';
  ratingSelect = '';
  textSearch = '';

  constructor(private route: ActivatedRoute, private categorieService: CategoriesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.queryParams['categorie'])
      this.categorieSelect = this.activatedRoute.snapshot.queryParams['categorie'];
    if(this.activatedRoute.snapshot.queryParams['pays'])
      this.paysSelect = this.activatedRoute.snapshot.queryParams['pays'];
    if(this.activatedRoute.snapshot.queryParams['textSearch'])
      this.textSearch = this.activatedRoute.snapshot.queryParams['textSearch'];
    if(this.activatedRoute.snapshot.queryParams['ville'])
      this.townSelect = this.activatedRoute.snapshot.queryParams['ville'];
    if(this.activatedRoute.snapshot.queryParams['rating'])
      this.ratingSelect = this.activatedRoute.snapshot.queryParams['rating'];
  }

}
