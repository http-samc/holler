// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDByyAXAmf42b_B4fj21Q3BlvNAiJR5rXE",
    authDomain: "holler-90cc9.firebaseapp.com",
    projectId: "holler-90cc9",
    storageBucket: "holler-90cc9.appspot.com",
    messagingSenderId: "647080243544",
    appId: "1:647080243544:web:b21ca2869f8dbf26e1352d",
    measurementId: "G-RH2CZJ51LS"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore, firebase };