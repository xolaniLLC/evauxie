import {Component, Input, OnInit} from '@angular/core';
import {SearchService} from "../../services/search.service";
import {Company} from "../../models/company";
import {AvisCompany} from "../../models/avis-company";
import {AvisCompanyService} from "../../services/avis-company.service";
import {CategoriesService} from "../../services/categories.service";

@Component({
  selector: 'app-zone-resultat-search',
  templateUrl: './zone-resultat-search.component.html',
  styleUrls: ['./zone-resultat-search.component.scss']
})
export class ZoneResultatSearchComponent implements OnInit {

  @Input() pays = '';
  @Input() text = '';
  @Input() excluCategorie = '';

  @Input() categorie = '';
  @Input() ville = '';
  @Input() rating = '';

  @Input() affordbility = '';

  @Input() pageInclude = '';

  typePrint = '';
  listeResultat: Company[] = [];
  page = 0;
  nbreLimitEltPrPage = 8;

  isLoading = true;

  constructor(private categorieService: CategoriesService, private avisCompanyService: AvisCompanyService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.typePrint = 'list';

    this.searchService.getAllCompaniesVerified().then(
      (data) => {
        this.isLoading = false;
        this.listeResultat = data;
        const pointe = this;
        data.forEach(function (doc) {
          if(doc.categorie !== pointe.excluCategorie) {

            if(pointe.text && (doc.adresse.toLowerCase().indexOf(pointe.text.toLowerCase()) === -1 && doc.ville.toLowerCase().indexOf(pointe.text.toLowerCase()) === -1 && doc.nom.toLowerCase().indexOf(pointe.text.toLowerCase()) === -1 && doc.description.toLowerCase().indexOf(pointe.text.toLowerCase()) === -1 && doc.pays.toString().toLowerCase().indexOf(pointe.text.toLowerCase()) === -1 && doc.siteWeb.toLowerCase().indexOf(pointe.text.toLowerCase()) === -1)) {
              pointe.deleteElement(doc);
            }

            if(pointe.categorie && doc.categorie !== pointe.categorie) {
              pointe.deleteElement(doc);
            }

            if(pointe.affordbility && doc.affordbility !== pointe.affordbility) {
              pointe.deleteElement(doc);
            }

            if(pointe.ville && doc.ville !== pointe.ville) {
              pointe.deleteElement(doc);
            }

            if((pointe.pageInclude === 'venues')) {
              pointe.categorieService.getCategorieWitchId(doc.categorie).then(
                (loum) => {
                  if(loum && !loum.parent) {
                    pointe.deleteElement(doc);
                  }
                }
              );
            }

            if(pointe.rating) {
              pointe.avisCompanyService.getAvisWitchIdCompany(doc.id).then(
                (docRef) => {
                  if(pointe.calculMoyenneAvis(docRef) !== Number(pointe.rating)) {
                    pointe.deleteElement(doc);
                  }
                }
              );
            }
          }
        });
      }
    )
  }

  calculMoyenneAvis(avis: AvisCompany[]) {
    let resultat = 0;
    for(let i=0; i<avis.length; i++) {
      resultat += avis[i].note;
    }
    return avis.length > 0 ? Math.round(resultat / avis.length) : 0;
  }

  deleteElement(elt: Company) {
    let tmpListe = this.listeResultat;
    this.listeResultat = [];
    for(let i=0; i<tmpListe.length; i++) {
      if(tmpListe[i].id !== elt.id) {
        this.listeResultat.push(tmpListe[i]);
      }
    }
  }

  recupNombreEntier(nbr: number) { //Par excès
    return Math.ceil(nbr);
  }


}
