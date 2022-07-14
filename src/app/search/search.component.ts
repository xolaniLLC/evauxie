import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../services/categories.service";
import {ActivatedRoute} from "@angular/router";
import {CategorieActivite} from "../models/categorie-activite";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  categories: CategorieActivite[] = [];
  categorieSelect = '';
  paysSelect = '';
  villeSelect = '';
  textSearch = '';

  constructor(private categorieService: CategoriesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
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

}
