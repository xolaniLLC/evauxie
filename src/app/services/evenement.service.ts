import { Injectable } from '@angular/core';
import firebase from "firebase";
import {Evenement} from "../models/evenement";
import {Task} from "../models/task";
import {Guest} from "../models/guest";

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  constructor() { }

  async deleteGuest(guest: Guest) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('invites').doc(guest.id).delete().then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async updateGuest(guest: Guest) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('invites').doc(guest.id).set(Object.assign({}, guest)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getGuestEvents(idEvent: string) {
    return new Promise<Guest[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('invites').where('idEvenement', '==', idEvent).onSnapshot(
        (docRef) => {
          const result: Guest[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as Guest);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async ajouterInvite(guest: Guest) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('invites').doc(guest.id).set(Object.assign({}, guest)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async deleteTask(task: Task) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('taches').doc(task.id).delete().then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async updateTask(tache: Task) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('taches').doc(tache.id).set(Object.assign({}, tache)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async ajouterTache(tache: Task) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('taches').doc(tache.id).set(Object.assign({}, tache)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getTaskEvents(idEvent: string) {
    return new Promise<Task[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('taches').where('idEvenement', '==', idEvent).onSnapshot(
        (docRef) => {
          const result: Task[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as Task);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async deleteEvent(event: Evenement) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('evenements').doc(event.id).delete().then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async updateEvent(event: Evenement) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('evenements').doc(event.id).set(Object.assign({}, event)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async ajouterEvenement(event: Evenement) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('evenements').doc(event.id).set(Object.assign({}, event)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getMyEvents() {
    return new Promise<Evenement[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('evenements').where('auteur', '==', firebase.auth().currentUser?.email).onSnapshot(
        (docRef) => {
          const result: Evenement[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as Evenement);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }
}
