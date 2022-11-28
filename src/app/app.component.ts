import { Component } from '@angular/core';
import firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Evauxie';

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyDAgqtHK_yJRXYKGdPriPSuweunoyIKADk",
      authDomain: "evauxie.firebaseapp.com",
      projectId: "evauxie",
      storageBucket: "evauxie.appspot.com",
      messagingSenderId: "255597885524",
      appId: "1:255597885524:web:aeb45f57b296a5583e15c1",
      measurementId: "G-SWTEP54135"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Activation de la persistance de donnée
    //firebase.firestore().enablePersistence();
  }
}
