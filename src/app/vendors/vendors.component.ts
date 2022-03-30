import { Component, OnInit } from '@angular/core';
import {CategorieActivite} from "../models/categorie-activite";
import {CategoriesService} from "../services/categories.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  categories: CategorieActivite[] = [];
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

    this.categorieService.getCategoriesActivites().then(
      (data) => {
        this.categories = data;
      }
    );
  }

}
