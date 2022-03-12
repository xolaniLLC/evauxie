import { Component, OnInit } from '@angular/core';
import {ForumService} from "../services/forum.service";
import {Topic} from "../models/topic";
import firebase from "firebase";
import {AlertService} from "../services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.scss']
})
export class NewTopicComponent implements OnInit {

  isLoading = false;
  html = '';
  titre = '';
  categorie = '';

  constructor(private forumService: ForumService, private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
  }

  sendTopic() {
    this.isLoading = true;
    if(this.titre && this.html && this.categorie) {
      this.forumService.addNewTopic(new Topic(this.titre, this.html, firebase.auth().currentUser?.email, this.categorie)).then(
        () => {
          this.isLoading = false;
          this.router.navigateByUrl('forum');
          this.alertService.print('Discussion sent successfully', 'success');
        }, (error) => {
          this.alertService.print(error, 'danger');
        }
      );
    } else { this.isLoading = false; this.alertService.print('One or more fields not filled in', 'danger'); }
  }

}
