import { Component, OnInit } from '@angular/core';
import {NewsletterService} from "../../services/newsletter.service";
import {Subscriber} from "../../models/subscriber";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isLoading = false;
  email = '';

  constructor(private newsletterService: NewsletterService) { }

  ngOnInit(): void {
  }

  newSubcriber() {
    this.isLoading = true;
    this.newsletterService.addSubcriber(new Subscriber(this.email)).then(
      () => {
        this.isLoading = false;
        this.email = '';
        alert('Ajouter avec succes');
      }
    )
  }

}
