import { Injectable } from '@angular/core';
import firebase from "firebase";
import {Message} from "../models/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  async getMessageWitchId(idMessage: any) {
    return new Promise<Message>((resolve, reject) => {
      firebase.firestore().collection('messages').doc(idMessage).onSnapshot(
        (docRef) => {
          resolve(docRef.data() as Message);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getMesMessagesNonLus() {
    return new Promise<Message[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('messages').where('destinataires', 'array-contains', firebase.auth().currentUser?.email).onSnapshot(
        (docRef) => {
          const result: Message[] = [];
          docRef.forEach(function (doc) {
            if (!(doc.data() as any).read.includes(firebase.auth().currentUser?.email))
              result.push(doc.data() as Message);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async updateMessage(msg: Message) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('messages').doc(msg.id).set(Object.assign({}, msg)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getMesMessagesEnvoyer() {
    return new Promise<Message[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('messages').where('auteur', '==', firebase.auth().currentUser?.email).onSnapshot(
        (docRef) => {
          const result: Message[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as Message);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getMesMessagesRecu() {
    return new Promise<Message[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('messages').where('destinataires', 'array-contains', firebase.auth().currentUser?.email).onSnapshot(
        (docRef) => {
          const result: Message[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as Message);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async envoyerMessage(message: Message) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('messages').doc(message.id).set(Object.assign({}, message)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async deleteMessage(id: string) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('messages').doc(id).delete().then(
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
