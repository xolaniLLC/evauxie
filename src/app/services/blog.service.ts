import { Injectable } from '@angular/core';
import firebase from "firebase";
import {Blog} from "../models/blog";
import {CommentaireBlog} from "../models/commentaire-blog";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() { }

  async getCommentaireWitchId(id: any) {
    return new Promise<CommentaireBlog>((resolve, reject) => {
      firebase.firestore().collection('commentaires_blogs').doc(id).get().then(
        (docRef) => {
          resolve(docRef.data() as CommentaireBlog);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async viewBlog(blog: any) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('blogs').doc(blog.id).update({
          vus : firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser?.email)
        }
      ).then(
        () => {
          resolve();
        }, () => {
          reject();
        }
      )
    });
  }

  async getCommentaireWitchIdBlog(idBlog: any) {
    return new Promise<CommentaireBlog[]>((resolve, reject) => {
      firebase.firestore().collection('commentaires_blogs').where('idBlog', '==', idBlog).get().then(
        (docRef) => {
          const result: CommentaireBlog[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as CommentaireBlog);
          });
          resolve(result as any);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async addCommentaire(commentaire: CommentaireBlog) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('commentaires_blogs').doc(commentaire.id).set(Object.assign({}, commentaire)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async addNewBlog(blog: Blog) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('blogs').doc(blog.id).set(Object.assign({}, blog)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getBlogsTop(taille: number) {
    return new Promise<Blog[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('blogs').limit(taille).onSnapshot(
        (docRef) => {
          const result: Blog[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as Blog);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getBlogs() {
    return new Promise<Blog[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('blogs').onSnapshot(
        (docRef) => {
          const result: Blog[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as Blog);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getBlogWitchId(id: any) {
    return new Promise<Blog>((resolve, reject) => {
      firebase.firestore().collection('blogs').doc(id).get().then(
        (docRef) => {
          resolve(docRef.data() as Blog);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
