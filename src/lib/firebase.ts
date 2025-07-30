// src/lib/firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCriAb3gkDgK-eOdCRonx0eXA0jkDpb2x8",
  authDomain: "resume-tailor-f2a49.firebaseapp.com",
  projectId: "resume-tailor-f2a49",
  storageBucket: "resume-tailor-f2a49.appspot.com",
  messagingSenderId: "171375354062",
  appId: "1:171375354062:web:5b489b77c9e0d31f07f09f",
  measurementId: "G-1LWG656LE1"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
