import {Component, Input, OnInit} from '@angular/core';
import {Blog} from "../../models/blog";
import {BlogService} from "../../services/blog.service";

@Component({
  selector: 'app-suggestions-article',
  templateUrl: './suggestions-article.component.html',
  styleUrls: ['./suggestions-article.component.scss']
})
export class SuggestionsArticleComponent implements OnInit {

  @Input() skin: any;
  listeArticles: Blog[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getBlogs().then(
      (result) => {
        this.listeArticles = result;
      }
    );
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
