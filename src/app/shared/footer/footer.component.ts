import { Component, OnInit } from '@angular/core';
import {NewsletterService} from "../../services/newsletter.service";
import {AlertService} from "../../services/alert.service";
import {Subscriber} from "../../models/subscriber";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isLoading = false;

  constructor(private newsletterService: NewsletterService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  newSubcriber(form: any) {
    this.isLoading = true;
    this.newsletterService.addSubcriber(new Subscriber(form.value.email)).then(
      () => {
        this.isLoading = false;
        this.alertService.print('Add successfully', 'success');
      }, (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'error');
      }
    )
  }

}
