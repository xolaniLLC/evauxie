import {Component, Input, OnInit} from '@angular/core';
import {Blog} from "../../models/blog";
import {BlogService} from "../../services/blog.service";
import {CommentaireBlog} from "../../models/commentaire-blog";

@Component({
  selector: 'app-suggestions-article',
  templateUrl: './suggestions-article.component.html',
  styleUrls: ['./suggestions-article.component.scss']
})
export class SuggestionsArticleComponent implements OnInit {

  @Input() skin: any;
  listeArticles: Blog[] = [];
  isLoading = true;

  constructor(private blogService: BlogService) { }

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
    return text.replace(/<([^>])*>/g,'').replace(/\&nbsp;/g, '');
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
