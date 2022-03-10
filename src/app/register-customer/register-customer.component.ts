import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.scss']
})
export class RegisterCustomerComponent implements OnInit {

  pass: boolean = false;
  clickEvent() {
    this.pass = !this.pass;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
