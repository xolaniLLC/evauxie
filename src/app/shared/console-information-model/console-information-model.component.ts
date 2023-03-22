import {Component, Input, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {CategorieActivite} from "../../models/categorie-activite";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-console-information-model',
  templateUrl: './console-information-model.component.html',
  styleUrls: ['./console-information-model.component.scss']
})
export class ConsoleInformationModelComponent implements OnInit {

  @Input() idCategorie = '';
  categorie!: CategorieActivite;

  constructor(private translate: TranslateService, private categorieService: CategoriesService) { }

  ngOnInit(): void {
    if(this.idCategorie) {
      this.categorieService.getCategorieWitchId(this.idCategorie).then(
        (data) => {
          this.categorie = data;
        }
      );
    }
  }

  getValueTraduct(texte: string, langue: string = '') {
    const wrapper = document.createElement('div');
    wrapper.innerHTML= texte;
    return wrapper.getElementsByTagName(langue ? langue : this.translate.defaultLang).length > 0 ? wrapper.getElementsByTagName(langue ? langue : this.translate.defaultLang)[0].innerHTML.replace('amp;', '')  : (texte && texte.includes('</') ? '' : texte);
  }

}
