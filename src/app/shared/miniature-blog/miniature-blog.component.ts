import {Component, Input, OnInit} from '@angular/core';
import {Utilisateur} from "../../models/utilisateur";
import {Blog} from "../../models/blog";
import {BlogService} from "../../services/blog.service";
import {UserService} from "../../services/user.service";
import {TranslateService} from "@ngx-translate/core";

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

  constructor(private translate: TranslateService, private blogService: BlogService, private userService: UserService) { }

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

  getPureTexte(brute: any): string {
    const element: HTMLElement = document.createElement('tmpConvert') as HTMLElement
    element.innerHTML = brute;
    return element.textContent as string;
  }

  extractImage(brute: string) {
    let result = '';
    let e1 = brute.split('img src="');
    if(e1.length > 1) {
      result = e1[1].split('"')[0];
    }
    return result.replace('amp;', '');
  }

  getValueTraduct(texte: string) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML= texte;
    return wrapper.getElementsByTagName(this.translate.defaultLang).length > 0 ? wrapper.getElementsByTagName(this.translate.defaultLang)[0].innerHTML.replace('amp;', '')  : (texte && texte.includes('</') ? '' : texte);
  }

}
