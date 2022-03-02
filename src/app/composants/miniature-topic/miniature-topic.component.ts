import {Component, Input, OnInit} from '@angular/core';
import {ForumService} from "../../services/forum.service";
import {UserService} from "../../services/user.service";
import {Topic} from "../../models/topic";
import {Utilisateur} from "../../models/utilisateur";
import {CommentaireTopic} from "../../models/commentaire-topic";

@Component({
  selector: 'app-miniature-topic',
  templateUrl: './miniature-topic.component.html',
  styleUrls: ['./miniature-topic.component.scss']
})
export class MiniatureTopicComponent implements OnInit {

  @Input() idTopic: any;
  @Input() skin: any;

  currentTopic: Topic | any = null;
  currentUser: Utilisateur | any = null;
  currentCommentaire: CommentaireTopic[] = [];
  currentUserComment: Utilisateur[] = [];
  emailsCommentateurs: string[] = [];

  constructor(private forumService: ForumService, private userService: UserService) { }

  ngOnInit(): void {
    this.forumService.getTopicWitchId(this.idTopic).then(
      (result) => {
        this.currentTopic = result;

        this.userService.getInfosUserWitchId(this.currentTopic.auteur).then(
          (result1) => {
            this.currentUser = result1;
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

  minEcouler(date: any): number {

    const startDate = new Date(date);
    const endDate = new Date();
    const startmin = startDate.getMinutes();
    const endmin = endDate.getMinutes();

    return startmin > endmin ? (startmin - endmin) : (endmin - startmin);
  }

  getPureTexte(brute: any) {
    return brute.toString().replace(/<[^>]*>/g, '').replace('&nbsp;', '');
  }

}
