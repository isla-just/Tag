// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// impot authentication
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA04Lco8LV-r5VLarwDKWueqo8ir_-_xzY",
  authDomain: "tagproject-26680.firebaseapp.com",
  projectId: "tagproject-26680",
  storageBucket: "tagproject-26680.appspot.com",
  messagingSenderId: "891528967607",
  appId: "1:891528967607:web:da842e747fec5f246a2432",
  measurementId: "G-Q9VTV8M7P6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//authenticating the app
export const auth = getAuth(app);
export const db = getFirestore(app);
