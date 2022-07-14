import {Component, Input, OnInit} from '@angular/core';
import {SearchService} from "../../services/search.service";
import {Company} from "../../models/company";

@Component({
  selector: 'app-zone-resultat-search',
  templateUrl: './zone-resultat-search.component.html',
  styleUrls: ['./zone-resultat-search.component.scss']
})
export class ZoneResultatSearchComponent implements OnInit {

  @Input() categorie = '';
  @Input() pays = '';
  @Input() text = '';
  @Input() excluCategorie = '';
  @Input() ville = '';

  typePrint = '';
  listeResultat: Company[] = [];
  page = 0;
  nbreLimitEltPrPage = 8;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.typePrint = 'list';

    this.searchService.getCompaniesVerified(this.categorie, this.pays, this.text, this.ville).then(
      (data) => {
        const pointe = this;
        data.forEach(function (doc) {
          if(doc.categorie !== pointe.excluCategorie)
            pointe.listeResultat.push(doc);
        });
      }
    )
  }

  recupNombreEntier(nbr: number) { //Par excès
    return Math.ceil(nbr);
  }

}
