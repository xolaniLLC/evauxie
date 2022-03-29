import { Injectable } from '@angular/core';
import {Company} from "../models/company";
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  async getCompaniesVerified(categorie: string, pays: string, texte: string) {
    return new Promise<Company[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('companies')
        //.where('verifier',  '!=', ' ')
        .where('misAjour',  '==', '')
        .where('categorie', categorie ? '==' : '!=', categorie ? categorie : '@!#')
        //.where('pays', pays ? '==' : '!=', pays ? pays : '@!#')
        .where('nom', texte ? 'array-contains' : '!=', texte ? texte : '@!#')
        .onSnapshot(
        (docRef) => {
          const result: Company[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as Company);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }
}
