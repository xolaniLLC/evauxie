import {Component, Input, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {CategorieActivite} from "../../models/categorie-activite";

@Component({
  selector: 'app-console-information-model',
  templateUrl: './console-information-model.component.html',
  styleUrls: ['./console-information-model.component.scss']
})
export class ConsoleInformationModelComponent implements OnInit {

  @Input() idCategorie = '';
  categorie!: CategorieActivite;

  constructor(private categorieService: CategoriesService) { }

  ngOnInit(): void {
    if(this.idCategorie) {
      this.categorieService.getCategorieWitchId(this.idCategorie).then(
        (data) => {
          this.categorie = data;
        }
      );
    }
  }

}
