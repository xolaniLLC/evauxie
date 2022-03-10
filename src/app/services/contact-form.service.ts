import { Injectable } from '@angular/core';
import firebase from "firebase";
import {UserContact} from "../models/user-contact";

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  constructor() { }

  async addContact(contact: UserContact) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('contacts').doc().set(Object.assign({}, contact)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
