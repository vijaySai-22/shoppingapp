import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuKebGzTesSRJi4qXRv0QzkhfUYeDuUyI",
  authDomain: "phonezone-6568e.firebaseapp.com",
  projectId: "phonezone-6568e",
  storageBucket: "phonezone-6568e.appspot.com",
  messagingSenderId: "1079950241442",
  appId: "1:1079950241442:web:4ebed889e2b7ba35e431fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore();