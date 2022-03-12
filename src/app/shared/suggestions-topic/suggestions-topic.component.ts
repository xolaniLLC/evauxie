import { Component, OnInit } from '@angular/core';
import {Topic} from "../../models/topic";
import {ForumService} from "../../services/forum.service";

@Component({
  selector: 'app-suggestions-topic',
  templateUrl: './suggestions-topic.component.html',
  styleUrls: ['./suggestions-topic.component.scss']
})
export class SuggestionsTopicComponent implements OnInit {

  listeTopics: Topic[] = [];

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.forumService.getTopics().then(
      (result) => {
        this.listeTopics = result;
      }
    );
  }

}
