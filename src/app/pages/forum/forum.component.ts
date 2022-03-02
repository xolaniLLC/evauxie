import { Component, OnInit } from '@angular/core';
import {ForumService} from "../../services/forum.service";
import {Topic} from "../../models/topic";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

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
