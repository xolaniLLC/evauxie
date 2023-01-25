import { Component, OnInit } from '@angular/core';
import {ForumService} from "../services/forum.service";
import {Topic} from "../models/topic";
import firebase from "firebase";
import {AlertService} from "../services/alert.service";
import {Router} from "@angular/router";
import {CategoriesService} from "../services/categories.service";
import {GroupForum} from "../models/group-forum";

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
  groupeForum: GroupForum[] = [];

  constructor(private categorieService: CategoriesService, private forumService: ForumService, private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
    this.categorieService.getGroupForumActivites().then(
      (data) => {
        this.groupeForum = data;
      }
    );
  }

  sendTopic() {
    this.isLoading = true;
    if(this.titre && this.html && this.categorie) {
      this.forumService.addNewTopic(new Topic(this.titre, this.html, firebase.auth().currentUser?.email, this.categorie)).then(
        () => {
          this.isLoading = false;
          this.router.navigateByUrl('forum');
          this.alertService.print('Done', 'success');
        }, (error) => {
          this.alertService.print(error, 'danger');
        }
      );
    } else { this.isLoading = false; this.alertService.print('One or more fields not filled in', 'danger'); }
  }

}
