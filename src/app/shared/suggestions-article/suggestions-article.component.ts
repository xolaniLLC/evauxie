import { Component, OnInit } from '@angular/core';
import {Blog} from "../../models/blog";
import {BlogService} from "../../services/blog.service";

@Component({
  selector: 'app-suggestions-article',
  templateUrl: './suggestions-article.component.html',
  styleUrls: ['./suggestions-article.component.scss']
})
export class SuggestionsArticleComponent implements OnInit {

  listeArticles: Blog[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getBlogs().then(
      (result) => {
        this.listeArticles = result;
      }
    );
  }

}
