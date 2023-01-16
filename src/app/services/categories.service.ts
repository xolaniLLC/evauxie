import { Injectable } from '@angular/core';
import firebase from "firebase";
import {CategorieActivite} from "../models/categorie-activite";
import {CommentaireBlog} from "../models/commentaire-blog";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }

  async addCategorie(categorie: CategorieActivite) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('categories_activites').doc(categorie.id).set(Object.assign({}, categorie)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getCategorieWitchId(id: string) {
    return new Promise<CategorieActivite>((resolve, reject) => {
      firebase.firestore().collection('categories_activites').doc(id).get().then(
        (docRef) => {
          resolve(docRef.data() as CategorieActivite);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async deleteCategorieActivite(id: string) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('categories_activites').doc(id).delete().then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async ajouterCategorieActivite(cat: CategorieActivite) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('categories_activites').doc(cat.id).set(Object.assign({}, cat)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getSousCategoriesActivites(categorie: string) {
    return new Promise<CategorieActivite[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('categories_activites').where('parent', '==', categorie).onSnapshot(
        (docRef) => {
          const result: CategorieActivite[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as CategorieActivite);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getCategoriesActivites() {
    return new Promise<CategorieActivite[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('categories_activites').where('parent', '==', '').onSnapshot(
        (docRef) => {
          const result: CategorieActivite[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as CategorieActivite);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getAllCategoriesActivites() {
    return new Promise<CategorieActivite[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('categories_activites').onSnapshot(
        (docRef) => {
          const result: CategorieActivite[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as CategorieActivite);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }
}
