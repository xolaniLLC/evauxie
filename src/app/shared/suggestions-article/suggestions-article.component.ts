import {Component, Input, OnInit} from '@angular/core';
import {Blog} from "../../models/blog";
import {BlogService} from "../../services/blog.service";
import {CommentaireBlog} from "../../models/commentaire-blog";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-suggestions-article',
  templateUrl: './suggestions-article.component.html',
  styleUrls: ['./suggestions-article.component.scss']
})
export class SuggestionsArticleComponent implements OnInit {

  @Input() skin: any;
  listeArticles: Blog[] = [];
  isLoading = true;

  constructor(private translate: TranslateService, private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getBlogs().then(
      (result) => {
        this.isLoading =false;
        let pointe = this;
        result.forEach(function (doc) {
          if(pointe.extractImage(doc.contenu)) {
            pointe.listeArticles.push(doc);
          }
        });
      }
    );
  }

  extractTextPure(text: string) : string {
    const element: HTMLElement = document.createElement('tmpConvert') as HTMLElement
    element.innerHTML = text;
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
