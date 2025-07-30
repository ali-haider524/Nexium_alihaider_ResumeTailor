// src/lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";



const firebaseConfig = {
  apiKey: "AIzaSyCriAb3gkDgK-eOdCRonx0eXA0jkDpb2x8",
  authDomain: "resume-tailor-f2a49.firebaseapp.com",
  projectId: "resume-tailor-f2a49",
  storageBucket: "resume-tailor-f2a49.firebasestorage.app",
  messagingSenderId: "171375354062",
  appId: "1:171375354062:web:5b489b77c9e0d31f07f09f",
  measurementId: "G-1LWG656LE1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Only load analytics on client side
let analytics: ReturnType<typeof getAnalytics> | undefined = undefined;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, analytics };
