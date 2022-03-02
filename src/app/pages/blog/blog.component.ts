import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {Blog} from "../../models/blog";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  listeBlogs: Blog[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getBlogs().then(
      (result) => {
        this.listeBlogs = result;
      }
    );
  }

  tempBlog() {
    this.blogService.addNewBlog(new Blog(['https://file.diplomeo-static.com/cache/1200x675/00/00/01/61/16153.jpg'], 'Objectif du mariage', 'blablabla', 'seffipeguy', ['mariage'], ['célébration'])).then(
      () => {
        alert('ajouter avec succes');
      }
    )
  }

}
