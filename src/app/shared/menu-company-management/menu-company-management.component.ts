import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-company-management',
  templateUrl: './menu-company-management.component.html',
  styleUrls: ['./menu-company-management.component.scss']
})
export class MenuCompanyManagementComponent implements OnInit {

  menu = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(this.router.url.includes('checklist')) {
      this.menu = 2;
    } else if(this.router.url.includes('vendors')) {
      this.menu = 3;
    } else if(this.router.url.includes('guest')) {
      this.menu = 4;
    } else if(this.router.url.includes('budget')) {
      this.menu = 5;
    } else if(this.router.url.includes('payment')) {
      this.menu = 6;
    } else {
      this.menu = 1;
    }
  }

}
