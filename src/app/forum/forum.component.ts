import { Component, OnInit } from '@angular/core';
import {Topic} from "../models/topic";
import {ForumService} from "../services/forum.service";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  listeTopics: Topic[] = [];
  printMenuCategorie = false;
  page = 0;
  nbreLimitEltPrPage = 5
  isLoading = true;

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.forumService.getTopics().then(
      (result) => {
        this.isLoading = false;
        this.listeTopics = result;
      }
    );
  }

  recupNombreEntier(nbr: number) { //Par excès
    return Math.ceil(nbr);
  }

  searchTopic(form: any) {

  }

}
