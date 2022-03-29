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

  typePrint = '';
  listeResultat: Company[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.typePrint = 'list';

    this.searchService.getCompaniesVerified(this.categorie, this.pays, this.text).then(
      (data) => {
        this.listeResultat = data;
      }
    )
  }

}
