import {Component, Input, OnInit} from '@angular/core';
import {Utilisateur} from "../../models/utilisateur";
import {Blog} from "../../models/blog";
import {BlogService} from "../../services/blog.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-miniature-blog',
  templateUrl: './miniature-blog.component.html',
  styleUrls: ['./miniature-blog.component.scss']
})
export class MiniatureBlogComponent implements OnInit {

  @Input() idBlog: any;
  @Input() skin: any;

  currentBlog: Blog | any = null;
  currentUser: Utilisateur | any = null;

  constructor(private blogService: BlogService, private userService: UserService) { }

  ngOnInit(): void {
    this.blogService.getBlogWitchId(this.idBlog).then(
      (data) => {
        this.currentBlog = data;

        this.userService.getInfosUserWitchId(this.currentBlog.auteur).then(
          (result1) => {
            this.currentUser = result1;
          }
        );
      }
    );
  }

  extractNombreJour(j: any) {
    const date1 = new Date(j);
    const date2 = new Date();
    const Diff_temps = date2.getTime() - date1.getTime();
    return Math.trunc(Diff_temps / (1000 * 3600 * 24));
  }

  getPureTexte(brute: any) {
    return brute.toString().replace(/<[^>]*>/g, '').replace('&nbsp;', '');
  }

  extractImage(brute: string) {
    let result = '';
    let e1 = brute.split('img src="');
    if(e1.length > 1) {
      result = e1[1].split('"')[0];
    }
    return result;
  }

}
