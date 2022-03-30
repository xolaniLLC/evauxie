import { Component, OnInit } from '@angular/core';
import {BlogService} from "../services/blog.service";
import {Blog} from "../models/blog";

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

  constructor(private blogService: BlogService) { }

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

}
