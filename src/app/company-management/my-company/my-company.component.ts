import { Component, OnInit } from '@angular/core';
import {Company} from "../../models/company";
import firebase from "firebase";

@Component({
  selector: 'app-my-company',
  templateUrl: './my-company.component.html',
  styleUrls: ['./my-company.component.scss']
})
export class MyCompanyComponent implements OnInit {

  slider: any;
  defaultTransform: any;
  listCompany: Company[] = [new Company(['1']),
    new Company(['2']),
    new Company(['3']),
    new Company(['4']),
    new Company(['5'])];
  currentCompany: any;
  stepMake = 0;

  constructor() {
    this.addNewCompany();
  }

  ngOnInit(): void {
    this.slider = document.getElementById("slider");
    this.defaultTransform=0;
  }

  save(form: any) {
    this.stepMake += 1;
  }

  addNewCompany() {
    let tmpCompany = new Company([firebase.auth().currentUser?.email as string]);
    this.listCompany.unshift(tmpCompany);
    this.currentCompany = tmpCompany;
    this.stepMake = 1;
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

}
