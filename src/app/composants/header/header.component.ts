import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isConnected = -1;

  constructor(private authService: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().then(
      (val) => {
        if(val) { this.isConnected = 1; } else { this.isConnected = 0; }
      }
    )
  }

  goDeconnect() {
    this.authService.signOut().then(
      () => {
        this.router.navigateByUrl('home');
      }
    );
  }

}
