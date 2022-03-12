import {Component, Input, OnInit} from '@angular/core';
import {CommentaireTopic} from "../../models/commentaire-topic";
import {Utilisateur} from "../../models/utilisateur";
import {ForumService} from "../../services/forum.service";
import {UserService} from "../../services/user.service";
import {CommentaireBlog} from "../../models/commentaire-blog";
import {BlogService} from "../../services/blog.service";

@Component({
  selector: 'app-commentaire-blog',
  templateUrl: './commentaire-blog.component.html',
  styleUrls: ['./commentaire-blog.component.scss']
})
export class CommentaireBlogComponent implements OnInit {

  @Input() idCommentaire: any;
  currentCommentaire: CommentaireBlog | any = null;
  currentAuthorUser: Utilisateur | any = null;

  constructor(private blogService: BlogService, private userService: UserService) { }

  ngOnInit(): void {
    this.blogService.getCommentaireWitchId(this.idCommentaire).then(
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
