// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,  //in vite we have to use import . meta
  authDomain: "codecraft-5f9c3.firebaseapp.com",
  projectId: "codecraft-5f9c3",
  storageBucket: "codecraft-5f9c3.firebasestorage.app",
  messagingSenderId: "913141662051",
  appId: "1:913141662051:web:0f8fd05e2671451e331356",
  measurementId: "G-64PCKZB1G4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
