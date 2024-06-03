// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA10_OBAqed1VpZEiNfZgSr22E_lyqqhQA",
  authDomain: "todoapp-67b16.firebaseapp.com",
  projectId: "todoapp-67b16",
  storageBucket: "todoapp-67b16.appspot.com",
  messagingSenderId: "663632682393",
  appId: "1:663632682393:web:f2a4504117da4a965e4708",
  measurementId: "G-D3PGY1QKPK",
   // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://todoapp-67b16-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app