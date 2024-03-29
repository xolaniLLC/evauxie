import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WriteMailService {

  modals: any[] = [];

  constructor() { }

  viderMoldal() {
    this.modals = [];
  }

  deleteModal(index: any) {
    this.modals.splice(index, 1);
  }

  new(destinataires: any, objet: string, message: string, reponse: string, isAdmin = false) {
    this.modals.push(
      {
        destinataires: destinataires,
        objet: objet,
        message: message,
        reponse: reponse,
        isAdmin: isAdmin
      }
    );
  }
}
