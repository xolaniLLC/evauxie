import {Component, Input, OnInit} from '@angular/core';
import {ForumService} from "../../services/forum.service";
import {CommentaireTopic} from "../../models/commentaire-topic";
import {Utilisateur} from "../../models/utilisateur";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-commentaire-topic',
  templateUrl: './commentaire-topic.component.html',
  styleUrls: ['./commentaire-topic.component.scss']
})
export class CommentaireTopicComponent implements OnInit {

  @Input() idCommentaire: any;
  currentCommentaire: CommentaireTopic | any = null;
  currentAuthorUser: Utilisateur | any = null;

  constructor(private forumService: ForumService, private userService: UserService) { }

  ngOnInit(): void {
    this.forumService.getCommentaireWitchId(this.idCommentaire).then(
      (doc) => {
        this.currentCommentaire = doc;

        this.userService.getInfosUserWitchId(this.currentCommentaire.auteur).then(
          (u)=> {
            this.currentAuthorUser = u;
          }
        );
      }
    );
  }

}
