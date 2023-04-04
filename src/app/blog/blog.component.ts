import { Component, OnInit } from '@angular/core';
import {BlogService} from "../services/blog.service";
import {Blog} from "../models/blog";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  listeBlog: Blog[] = [];
  isLoading = true;
  page = 0;
  nbreLimitEltPrPage = 6;

  constructor(private translate: TranslateService, private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getBlogs().then(
      (data) => {
        this.isLoading = false;
       this.listeBlog = data;
      }
    );
  }

  recupNombreEntier(nbr: number) { //Par excès
    return Math.ceil(nbr);
  }

  searchBlog(form: any) {

  }

  getValueTraduct(texte: string) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML= texte;
    return wrapper.getElementsByTagName(this.translate.defaultLang).length > 0 ? wrapper.getElementsByTagName(this.translate.defaultLang)[0].innerHTML.replace('amp;', '')  : (texte && texte.includes('</') ? '' : texte);
  }

}
