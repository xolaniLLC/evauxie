import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-planning-tools',
  templateUrl: './planning-tools.component.html',
  styleUrls: ['./planning-tools.component.scss']
})
export class PlanningToolsComponent implements OnInit {

  constructor(private authService: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().then(
      (etat) => {
        if(etat)
          this.router.navigateByUrl('planning-tools/my-events');
      }
    );
  }

}
