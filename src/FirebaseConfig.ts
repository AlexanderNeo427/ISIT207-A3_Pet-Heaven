// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAaOWC_dYSki-BqO3rvEvOHUT83S1xuiJw",
    authDomain: "pet-heaven-9fbb4.firebaseapp.com",
    projectId: "pet-heaven-9fbb4",
    storageBucket: "pet-heaven-9fbb4.appspot.com",
    messagingSenderId: "661594715565",
    appId: "1:661594715565:web:4cd273d3bbfb2fca02dd24",
    measurementId: "G-EKTRCHM95K"
};

const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)
const googleAuthProvider = new GoogleAuthProvider()

export {
    firebaseAuth,
    googleAuthProvider
}