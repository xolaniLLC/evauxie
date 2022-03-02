import { Component, OnInit } from '@angular/core';
import {ForumService} from "../../../services/forum.service";
import {Topic} from "../../../models/topic";
import firebase from "firebase";

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.scss']
})
export class NewTopicComponent implements OnInit {

  html: any;
  titre: any;
  categorie: any;
  listeTopics: Topic[] = [];

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.forumService.getTopics().then(
      (result) => {
        this.listeTopics = result;
      }
    );
  }

  sendTopic(form: any) {
    if(form.value.titre && form.value.html && form.value.categorie) {
      this.forumService.addNewTopic(new Topic(form.value.titre, form.value.html, firebase.auth().currentUser?.email, form.value.categorie)).then(
        () => {
          alert('ajouter avec succes');
        }
      );
    } else { alert('Un ou plusieurs champs vide'); }
  }

}
