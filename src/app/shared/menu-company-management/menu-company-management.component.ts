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
    if(this.router.url.includes('notices')) {
      this.menu = 2;
    } else {
      this.menu = 1;
    }
  }

}
