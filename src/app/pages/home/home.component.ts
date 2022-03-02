import { Component, OnInit } from '@angular/core';
import {ContactFormService} from "../../services/contact-form.service";
import {UserContact} from "../../models/user-contact";
import {BlogService} from "../../services/blog.service";
import {Blog} from "../../models/blog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoadingFormContact = false;
  listeBlogs: Blog[] = [];

  constructor(private contactForm: ContactFormService, private blogService: BlogService) { }

  saveNewContact(form: any) {
    this.contactForm.addContact(new UserContact(form.value.fullName, form.value.email, form.value.phone, form.value.message, form.value.typeEvent)).then(
      () => {
        alert('Contact envoyé')
      }
    );
  }

  ngOnInit(): void {
    this.blogService.getBlogsTop(3).then(
      (result) => {
        this.listeBlogs = result;
      }
    );
  }

}
