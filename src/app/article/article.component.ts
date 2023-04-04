import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../models/utilisateur";
import firebase from "firebase";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {AuthentificationService} from "../services/authentification.service";
import {BlogService} from "../services/blog.service";
import {Blog} from "../models/blog";
import {CommentaireBlog} from "../models/commentaire-blog";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  currentBlog: Blog | any = null;
  currentUserAuthor: Utilisateur | any = null;
  currentCommentaire: CommentaireBlog[] = [];
  currentUserComment: Utilisateur[] = [];
  emailsCommentateurs: string[] = [];
  currentUserEmail: any = null;
  isLoadingSendReply = false;
  html = '';

  constructor(private translate: TranslateService, private userService: UserService, private activatedRoute: ActivatedRoute, private blogService: BlogService, private authService: AuthentificationService) { }

  ngOnInit(): void {
    this.blogService.getBlogWitchId(this.activatedRoute.snapshot.paramMap.get('id')).then(
      (data) => {
        this.currentBlog = data;

        this.authService.isAuthenticated().then(
          (data) => {
            if(data) {
              this.currentUserEmail = firebase.auth().currentUser?.email;

              if(!this.currentBlog.vus.includes(this.currentUserEmail)) {
                this.blogService.viewBlog(this.currentBlog).then(
                  () => {
                    this.currentBlog.vus.push(this.currentUserEmail);
                  }
                )
              }
            }
          }
        );

        this.userService.getInfosUserWitchId(this.currentBlog.auteur).then(
          (result1) => {
            this.currentUserAuthor = result1;
          }
        );

        this.blogService.getCommentaireWitchIdBlog(this.currentBlog.id).then(
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
    const tmpCom = new CommentaireBlog(this.currentUserEmail, this.html, this.currentBlog.id);
    this.blogService.addCommentaire(tmpCom).then(
      () => {
        this.html = '';
        this.isLoadingSendReply = false;
        this.currentCommentaire.push(tmpCom);
      }
    );
  }

  getValueTraduct(texte: string) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML= texte;
    return wrapper.getElementsByTagName(this.translate.defaultLang).length > 0 ? wrapper.getElementsByTagName(this.translate.defaultLang)[0].innerHTML.replace('amp;', '')  : texte;
  }

}
