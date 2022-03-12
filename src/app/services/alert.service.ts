import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  notifications: any[] = [];

  constructor() { }

  viderNotif() {
    this.notifications = [];
  }

  deleteNotif(index: any) {
    this.notifications.splice(index, 1);
  }

  print(texte: string, type: string) {
    this.notifications.push(
      {
        texte: texte,
        type: type
      }
    );
  }
}
