import { Injectable } from '@angular/core';
import firebase from "firebase";
import {Topic} from "../models/topic";
import {CommentaireTopic} from "../models/commentaire-topic";

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor() { }

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
