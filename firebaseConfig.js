// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "REPLACEMENT_STRING",
  authDomain: "somanisalon.firebaseapp.com",
  projectId: "somanisalon",
  storageBucket: "somanisalon.appspot.com",
  messagingSenderId: "868842514394",
  appId: "1:868842514394:web:f812a63e9e7bcc8ed042e3",
  measurementId: "G-5BM28F47NY"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)

export const user = authentication.currentUser;
export const db = getFirestore(app)
const analytics = getAnalytics(app);
