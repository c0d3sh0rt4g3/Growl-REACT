// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_GROWL_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_GROWL_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_GROWL_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_GROWL_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_GROWL_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_GROWL_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const onAuthStateChange = (auth, user) => {
    return onAuthStateChanged(auth, user);
}

export const signOut = () => {
    return firebaseSignOut(auth);
};