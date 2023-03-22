import {Component, Input, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {CategorieActivite} from "../../models/categorie-activite";
import {ApiService} from "../../services/api.service";
import {Pays} from "../../models/pays";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-barre-search',
  templateUrl: './barre-search.component.html',
  styleUrls: ['./barre-search.component.scss']
})
export class BarreSearchComponent implements OnInit {

  @Input() textPreload = '';
  @Input() countryPreload = '';

  searchTxt = '';
  searchCountry = '';
  popOver = false;
  categories: CategorieActivite[] = [];
  codeCat = '';
  listePays: Pays[] = [];

  constructor(private translate: TranslateService, private apiService: ApiService, private categorieService: CategoriesService) { }

  ngOnInit(): void {
    if(this.textPreload) { this.searchTxt = this.textPreload; }
    if(this.countryPreload) { this.searchCountry = this.countryPreload; }
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

  getValueTraduct(texte: string, langue: string = '') {
    const wrapper = document.createElement('div');
    wrapper.innerHTML= texte;
    return wrapper.getElementsByTagName(langue ? langue : this.translate.defaultLang).length > 0 ? wrapper.getElementsByTagName(langue ? langue : this.translate.defaultLang)[0].innerHTML.replace('amp;', '')  : (texte && texte.includes('</') ? '' : texte);
  }

}
