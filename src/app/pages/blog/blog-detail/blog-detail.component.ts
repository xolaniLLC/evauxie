import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../../services/blog.service";
import {ActivatedRoute} from "@angular/router";
import {Blog} from "../../../models/blog";
import {CommentaireBlog} from "../../../models/commentaire-blog";
import {UserService} from "../../../services/user.service";
import {Utilisateur} from "../../../models/utilisateur";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  currentBlog: any = null;
  commentaires: CommentaireBlog[] = [];

  constructor(private blogService: BlogService, private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.blogService.getBlogWitchId(this.activatedRoute.snapshot.paramMap.get('id')).then(
      (result) => {
        this.currentBlog = result;
      }
    );

    this.blogService.getCommentaireWitchIdBlog(this.activatedRoute.snapshot.paramMap.get('id')).then(
      (result1) => { console.log('oui ' , result1);
        this.commentaires = result1;
      }
    );
  }

  heureEcouler(date: any): number {

    const startDate = new Date(date);
    const endDate = new Date();
    const starthour = startDate.getHours();
    const endhour = endDate.getHours();

    return starthour > endhour ? (starthour - endhour) : (endhour - starthour);
  }

  recupInfoUser(email: string): any {
    this.userService.getInfosUserWitchId(email).then(
      (data) => {
        return data;
      }
    );
  }

  ajouterCommentaire(form: any) {
    this.blogService.addCommentaire(new CommentaireBlog(form.value.nom, form.value.email, form.value.message, this.currentBlog.id)).then(
      () => {
        alert('ajouter avec succes');
      }
    )
  }

}
