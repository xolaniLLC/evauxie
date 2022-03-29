import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {CategorieActivite} from "../../models/categorie-activite";

@Component({
  selector: 'app-barre-search',
  templateUrl: './barre-search.component.html',
  styleUrls: ['./barre-search.component.scss']
})
export class BarreSearchComponent implements OnInit {

  searchTxt = '';
  searchCountry = '';
  popOver = false;
  categories: CategorieActivite[] = [];
  codeCat = '';

  constructor(private categorieService: CategoriesService) { }

  ngOnInit(): void {
    this.categorieService.getCategoriesActivites().then(
      (data) => {
        this.categories = data;
      }
    );
  }

}
