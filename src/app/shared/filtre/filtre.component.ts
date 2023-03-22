import {Component, Input, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {CategorieActivite} from "../../models/categorie-activite";
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.scss']
})
export class FiltreComponent implements OnInit {

  @Input() pageInclude = '';

  categories: CategorieActivite[] = [];
  isLoadingCat = true;
  viewCat = true;
  categorieSelect = '';

  viewAffordbility = true;
  affordbilitySelect = '';

  viewTown = true;
  isLoadingTown = false;
  towns: any[] = [];
  townSelect = '';

  viewRating = true;
  ratingSelect = 0;

  constructor(private apiService: ApiService, private translate: TranslateService, private activatedRoute: ActivatedRoute, private categoryService: CategoriesService, private location: Location) { }

  ngOnInit(): void {
    this.categoryService.getAllCategoriesActivites().then(
      (data) => {
        this.isLoadingCat = false;

        let pointe = this;
        data.forEach(function (doc) {
          if((pointe.pageInclude === 'venues' && doc.parent) || (!pointe.pageInclude && !doc.parent)) {
            if(pointe.getValueTraduct(doc.titre.toLowerCase(), 'fr') !== 'réception')
              pointe.categories.push(doc);
          }
        });
      }
    );

    this.apiService.getPays().then(
      (data) => {
        const pointe = this;
        data.forEach(function (doc) {
          doc.villes.forEach(function (dac) {
            pointe.towns.push(dac);
          });
        });
      }
    );

    this.categorieSelect = this.activatedRoute.snapshot.queryParams['categorie'] ? this.activatedRoute.snapshot.queryParams['categorie'] : '';
    this.affordbilitySelect = this.activatedRoute.snapshot.queryParams['affordbility'] ? this.activatedRoute.snapshot.queryParams['affordbility'] : '';
    this.townSelect = this.activatedRoute.snapshot.queryParams['ville'] ? this.activatedRoute.snapshot.queryParams['ville'] : '';
    this.ratingSelect = this.activatedRoute.snapshot.queryParams['rating'] ? Number(this.activatedRoute.snapshot.queryParams['rating']) : 0;
  }

  getValueTraduct(texte: string, langue: string = '') {
    const wrapper = document.createElement('div');
    wrapper.innerHTML= texte;
    return wrapper.getElementsByTagName(langue ? langue : this.translate.defaultLang).length > 0 ? wrapper.getElementsByTagName(langue ? langue : this.translate.defaultLang)[0].innerHTML.replace('amp;', '')  : (texte && texte.includes('</') ? '' : texte);
  }

  updateCurrentLink(param: string, valeur: string) {
    if(this.location.path().includes(param)) {
      this.location.replaceState(this.location.path().replace(param + '=', 'oldParam'));
    }
    this.location.replaceState(this.location.path() + (this.location.path().includes('?') ? '&' : '?') + param + '=' + valeur);
    location.reload();
  }

}
