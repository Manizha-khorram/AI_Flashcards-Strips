// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const FirebaseConfig = {
    apiKey: "AIzaSyDwQGFHOf087gGFuSanQJpLQfx9IWu3G5g",
    authDomain: "flashcards-69116.firebaseapp.com",
    projectId: "flashcards-69116",
    storageBucket: "flashcards-69116.appspot.com",
    messagingSenderId: "803742953584",
    appId: "1:803742953584:web:5aaf414dcd2b08f4f184b5",
    measurementId: "G-MVME5DSPVJ"
};

// Initialize Firebase
const app = initializeApp(FirebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };