import {Component, Input, OnInit} from '@angular/core';
import {BlogService} from "../../services/blog.service";

@Component({
  selector: 'app-miniature-blog',
  templateUrl: './miniature-blog.component.html',
  styleUrls: ['./miniature-blog.component.scss']
})
export class MiniatureBlogComponent implements OnInit {

  @Input() idBlog: any;
  currentBlog: any = null;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getBlogWitchId(this.idBlog).then(
      (result) => {
        this.currentBlog = result;
      }
    );
  }

}
