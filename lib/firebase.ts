// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpHKt0oWEiBS1ttzXBwnvPlAQfsOOg3Mo",
  authDomain: "lawn-caree.firebaseapp.com",
  projectId: "lawn-caree",
  storageBucket: "lawn-caree.firebasestorage.app",
  messagingSenderId: "231458856706",
  appId: "1:231458856706:web:f2708a5d6ff8f589742c1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);