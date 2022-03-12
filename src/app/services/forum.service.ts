import { Injectable } from '@angular/core';
import firebase from "firebase";
import {Topic} from "../models/topic";
import {CommentaireTopic} from "../models/commentaire-topic";

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor() { }

  async addCommentTopic(comment: CommentaireTopic) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('commentaires_topics').doc(comment.id).set(Object.assign({}, comment)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async viewTopic(topic: any) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('topics').doc(topic.id).update({
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

  async likeTopic(topic: any) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('topics').doc(topic.id).update({
          like : topic.like.includes(firebase.auth().currentUser?.email) ? firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser?.email) : firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser?.email)
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

  async getTopics() {
    return new Promise<Topic[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('topics').onSnapshot(
        (docRef) => {
          const result: Topic[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as Topic);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getCommentaireWitchIdTopic(idTopic: any) {
    return new Promise<CommentaireTopic[]>((resolve, reject) => {
      firebase.firestore().collection('commentaires_topics').where('idTopic', '==', idTopic).get().then(
        (docRef) => {
          const result: CommentaireTopic[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as CommentaireTopic);
          });
          resolve(result as any);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getCommentaireWitchId(id: any) {
    return new Promise<CommentaireTopic>((resolve, reject) => {
      firebase.firestore().collection('commentaires_topics').doc(id).get().then(
        (docRef) => {
          resolve(docRef.data() as CommentaireTopic);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getTopicWitchId(id: any) {
    return new Promise<Topic>((resolve, reject) => {
      firebase.firestore().collection('topics').doc(id).get().then(
        (docRef) => {
          resolve(docRef.data() as Topic);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async addNewTopic(topic: Topic) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('topics').doc(topic.id).set(Object.assign({}, topic)).then(
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
