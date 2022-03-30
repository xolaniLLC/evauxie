import { Injectable } from '@angular/core';
import {CommentaireBlog} from "../models/commentaire-blog";
import firebase from "firebase";
import {AvisCompany} from "../models/avis-company";

@Injectable({
  providedIn: 'root'
})
export class AvisCompanyService {

  constructor() { }

  async getAvisWitchId(id: string) {
    return new Promise<AvisCompany>((resolve, reject) => {
      firebase.firestore().collection('avis_companies').doc(id).get().then(
        (docRef) => {
          resolve(docRef.data() as AvisCompany);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async addAvis(ac: AvisCompany) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('avis_companies').doc(ac.id).set(Object.assign({}, ac)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getAvisWitchIdCompany(id: string) {
    return new Promise<AvisCompany[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('avis_companies').where('idCompany', '==', id).onSnapshot(
        (docRef) => {
          const result: AvisCompany[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as AvisCompany);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }
}
