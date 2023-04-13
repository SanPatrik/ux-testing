import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCliiyOLKBMHOCtLnMMYTsF0PeuMKQTQ1I",
    authDomain: "ux-testing-3b14b.firebaseapp.com",
    databaseURL: "https://ux-testing-3b14b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ux-testing-3b14b",
    storageBucket: "ux-testing-3b14b.appspot.com",
    messagingSenderId: "48428948061",
    appId: "1:48428948061:web:8518a33858e8dc41b1cbb4",
    measurementId: "G-G72VL2KKHR"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export {db, storage, storageRef, auth, googleProvider, firebaseSignOut, onAuthStateChanged, getDownloadURL, uploadBytes };