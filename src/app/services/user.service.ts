import { Injectable } from '@angular/core';
import {Blog} from "../models/blog";
import firebase from "firebase";
import {Utilisateur} from "../models/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async getInfosUserWitchId(id: string) {
    return new Promise<Utilisateur>((resolve, reject) => {
      firebase.firestore().collection('comptes').doc(id).get().then(
        (docRef) => {
          resolve(docRef.data() as Utilisateur);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
