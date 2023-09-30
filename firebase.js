// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { logEvent, setAnalyticsCollectionEnabled } from 'expo-firebase-analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNm8K5zq95_pWMO1fT6fsumO9GRGcxzig",
  authDomain: "todoapp-4c01e.firebaseapp.com",
  projectId: "todoapp-4c01e",
  storageBucket: "todoapp-4c01e.appspot.com",
  messagingSenderId: "74409345330",
  appId: "1:74409345330:web:14bf55b5ace50079bc972b",
  measurementId: "G-9E765V3QNW"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
setAnalyticsCollectionEnabled(true);
export const authenthication = getAuth(app);
export const db = getFirestore(app)