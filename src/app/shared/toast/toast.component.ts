import { Component, OnInit } from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  oldUrl = '';

  constructor(public alertService: AlertService, private router: Router) {
    this.oldUrl = window.location.href;
    this.router.events.subscribe((val) => {
      if(this.oldUrl !== window.location.href) { this.alertService.viderNotif(); }
    });
  }

  ngOnInit(): void {
  }

  public closeModal(i: number) {
    let p = this;
    let notification: any = document.getElementById("notification_" + i);
    notification.style.transform = "translateX(150%)";
    setTimeout(function () {
      p.alertService.deleteNotif(i);
    }, 1000);
  }
}
