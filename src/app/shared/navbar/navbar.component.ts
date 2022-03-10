import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  sm_1 = false;
  sm_1_2 = false;
  sm_1_3 = false;
  sm_2 = false;

  constructor() { }

  ngOnInit(): void {
  }

}
