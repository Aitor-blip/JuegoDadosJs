'use strict';
console.log("Este es el archivo de configuracion de firebase");

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
// Importo Cloud Firestore
import {getFirestore} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

 // Import the functions you need from the SDKs you need
 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 export const firebaseConfig = {
   apiKey: "AIzaSyCI0IAJrtFeZf8_woFVSMkf73TiLParrXU",
   authDomain: "juego-dados-c8738.firebaseapp.com",
   projectId: "juego-dados-c8738",
   storageBucket: "juego-dados-c8738.appspot.com",
   messagingSenderId: "445911526973",
   appId: "1:445911526973:web:48c90caf8f835ac7b94454",
   measurementId: "G-5ZED96SX0K"
 };

export const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);
export const analytics = getAnalytics(app);

export const db = getFirestore(app);