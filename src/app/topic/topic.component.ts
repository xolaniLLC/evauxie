import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ForumService} from "../services/forum.service";
import {Topic} from "../models/topic";
import {UserService} from "../services/user.service";
import {Utilisateur} from "../models/utilisateur";
import {CommentaireTopic} from "../models/commentaire-topic";
import firebase from "firebase";
import {AuthentificationService} from "../services/authentification.service";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  currentTopic: Topic | any = null;
  currentUserAuthor: Utilisateur | any = null;
  currentCommentaire: CommentaireTopic[] = [];
  currentUserComment: Utilisateur[] = [];
  emailsCommentateurs: string[] = [];
  currentUserEmail: any = null;
  isLoadingSendReply = false;
  isLoadingLike = false;
  html = '';

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private forumService: ForumService, private authService: AuthentificationService) { }

  ngOnInit(): void {
    this.forumService.getTopicWitchId(this.activatedRoute.snapshot.paramMap.get('id')).then(
      (data) => {
        this.currentTopic = data;

        this.authService.isAuthenticated().then(
          (data) => {
            if(data) {
              this.currentUserEmail = firebase.auth().currentUser?.email;

              if(!this.currentTopic.vus.includes(this.currentUserEmail)) {
                this.forumService.viewTopic(this.currentTopic).then(
                  () => {
                    this.currentTopic.vus.push(this.currentUserEmail);
                  }
                )
              }
            }
          }
        );

        this.userService.getInfosUserWitchId(this.currentTopic.auteur).then(
          (result1) => {
            this.currentUserAuthor = result1;
          }
        );

        this.forumService.getCommentaireWitchIdTopic(this.currentTopic.id).then(
          (result2) => {
            this.currentCommentaire = result2;

            for(let y=0; y<this.currentCommentaire.length && this.emailsCommentateurs.length <=5; y++) {
              if(!this.emailsCommentateurs.includes(this.currentCommentaire[y].auteur)) {
                this.emailsCommentateurs.push(this.currentCommentaire[y].auteur);
                this.userService.getInfosUserWitchId(this.currentCommentaire[y].auteur).then(
                  (result3) => {
                    this.currentUserComment.push(result3);
                  }
                );
              }
            }
          }
        );
      }
    );
  }

  sendReply() {
    this.isLoadingSendReply = true;
    const tmpCom = new CommentaireTopic(this.currentUserEmail, this.html, this.currentTopic.id);
    this.forumService.addCommentTopic(tmpCom).then(
      () => {
        this.html = '';
        this.isLoadingSendReply = false;
        this.currentCommentaire.push(tmpCom);
      }
    );
  }

  getPureTexte(brute: any) {
    return brute.toString().replace(/<[^>]*>/g, '').replace('&nbsp;', '');
  }

  like() {
    this.isLoadingLike = true;
    this.forumService.likeTopic(this.currentTopic).then(
      () => {
        this.currentTopic.like.includes(this.currentUserEmail as string) ? this.currentTopic.like.splice(this.currentTopic.like.indexOf(this.currentUserEmail), 1) : this.currentTopic.like.push(this.currentUserEmail);
        this.isLoadingLike = false;
      }
    );
  }

}
