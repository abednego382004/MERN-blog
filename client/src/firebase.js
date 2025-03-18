// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-73ff7.firebaseapp.com",
  projectId: "mern-blog-73ff7",
  storageBucket: "mern-blog-73ff7.firebasestorage.app",
  messagingSenderId: "690975944673",
  appId: "1:690975944673:web:2b940b46f973d0b0e02ca0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
