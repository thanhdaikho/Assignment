// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGFyRqCLKcqR3Wbx_oTXvZdevj3qczcS8",
  authDomain: "veryhigh-28b95.firebaseapp.com",
  projectId: "veryhigh-28b95",
  storageBucket: "veryhigh-28b95.appspot.com",
  messagingSenderId: "996958635076",
  appId: "1:996958635076:web:4d9531325eab1df238a811"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig)
const FIREBASE_AUTH = getAuth(FIREBASE_APP)
const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);
const FIREBASE_STORAGE = getStorage(FIREBASE_APP)

export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_FIRESTORE, FIREBASE_STORAGE };


