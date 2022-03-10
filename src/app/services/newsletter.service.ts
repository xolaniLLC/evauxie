import { Injectable } from '@angular/core';
import firebase from "firebase";
import {Subscriber} from "../models/subscriber";

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor() { }

  async addSubcriber(suscriber: Subscriber) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('newsletter').doc(suscriber.email).set(Object.assign({}, suscriber)).then(
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
