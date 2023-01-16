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
  affordbilitySelect = '';
  townSelect = '';
  ratingSelect = '';
  textSearch = '';

  constructor(private categorieService: CategoriesService, private activatedRoute: ActivatedRoute) { }

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
    if(this.activatedRoute.snapshot.queryParams['affordbility'])
      this.affordbilitySelect = this.activatedRoute.snapshot.queryParams['affordbility'];
  }

  transformToNumber(numberString: string): number {
    return Number(numberString);
  }

}
