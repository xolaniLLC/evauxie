import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../services/authentification.service";
import firebase from "firebase";
import {ContactFormService} from "../services/contact-form.service";
import {UserContact} from "../models/user-contact";
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bt_location = false;
  slider: any;
  defaultTransform: any;
  slideselect = 0;
  currentEmailUser: any = null;
  isLoadingSendContact = false;
  e1 = false;
  e2 = false;
  e3 = false;

  constructor(private authenService: AuthentificationService, private contactForm: ContactFormService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.slider = document.getElementById("slider");
    this.defaultTransform=0;
    this.slideselect = Math.floor(Math.random() * 3 ) + 1;
    this.authenService.isAuthenticated().then(
      (data) => {
        if (data)
          this.currentEmailUser = firebase.auth().currentUser?.email;
        else this.currentEmailUser = '';
      }
    );
  }

  search() {

  }

  goNext() {
    this.defaultTransform = this.defaultTransform - 398;
    if (Math.abs(this.defaultTransform) >= this.slider.scrollWidth / 1.7) this.defaultTransform = 0;
    this.slider.style.transform = "translateX(" + this.defaultTransform + "px)";
  }
  goPrev() {

    if (Math.abs(this.defaultTransform) === 0) this.defaultTransform = 0;
    else this.defaultTransform = this.defaultTransform + 398;
    this.slider.style.transform = "translateX(" + this.defaultTransform + "px)";
  }

  saveNewContact(form: any) {
    this.isLoadingSendContact = true;
    this.contactForm.addContact(new UserContact(form.value.fullName, form.value.email, form.value.phone, form.value.message, form.value.typeEvent)).then(
      () => {
        this.isLoadingSendContact = false;
        this.alertService.print('Your message has been sent', 'success');
      }, (error) => {
        this.isLoadingSendContact = false;
        this.alertService.print(error, 'danger')
      }
    );
  }
}
