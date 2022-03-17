import { Component, OnInit } from '@angular/core';
import {Evenement} from "../../models/evenement";
import {Depense} from "../../models/depense";
import {EvenementService} from "../../services/evenement.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  isLoading = false;
  currentEvent: Evenement | any = null;
  depenses: Depense[] = [];
  currentCategorySelect = '';
  etatPrint = 0;

  constructor(private eventService: EvenementService) { }

  ngOnInit(): void {
    const p = this;
    this.eventService.getMyEvents().then(
      (result) => {
        result.forEach(function (evt) {
          if (evt.etat === 1) {
            p.currentEvent = evt;
          }
        });

        this.eventService.getDepenseEvents(this.currentEvent.id).then(
          (result) => {
            this.depenses = result;
          }
        );
      }
    );
  }

}
