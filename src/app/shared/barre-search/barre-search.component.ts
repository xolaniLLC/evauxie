import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {CategorieActivite} from "../../models/categorie-activite";
import {ApiService} from "../../services/api.service";
import {Pays} from "../../models/pays";

@Component({
  selector: 'app-barre-search',
  templateUrl: './barre-search.component.html',
  styleUrls: ['./barre-search.component.scss']
})
export class BarreSearchComponent implements OnInit {

  searchTxt = '';
  searchCountry = '';
  searchRate = 0;
  popOver = false;
  categories: CategorieActivite[] = [];
  codeCat = '';
  listePays: Pays[] = [];

  constructor(private apiService: ApiService, private categorieService: CategoriesService) { }

  ngOnInit(): void {
    this.categorieService.getCategoriesActivites().then(
      (data) => {
        this.categories = data;
      }
    );

    this.apiService.getPays().then(
      (data) => {
        this.listePays = data;
      }
    );
  }

}
