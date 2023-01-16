import { Injectable } from '@angular/core';
import firebase from "firebase";
import {Company} from "../models/company";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  async getCompanyWitchId(id: any) {
    return new Promise<Company>((resolve, reject) => {
      firebase.firestore().collection('companies').doc(id).get().then(
        (docRef) => {
          resolve(docRef.data() as Company);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getCompanyWitchIdUser(id: any) {
    return new Promise<Company[]>((resolve, reject) => {
      firebase.firestore().collection('companies').where('administrateurs', "array-contains", id).get().then(
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

  async getAllCompanies() {
    return new Promise<Company[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('companies').onSnapshot(
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

  async getCompanies() {
    return new Promise<Company[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('companies').where('administrateurs', 'array-contains', firebase.auth().currentUser?.email).onSnapshot(
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

  async updateCompany(com: Company) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('companies').doc(com.id).set(Object.assign({}, com)).then(
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
