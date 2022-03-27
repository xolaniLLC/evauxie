import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.scss']
})
export class CompanyManagementComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigateByUrl('company-management/my-company');
  }

}
