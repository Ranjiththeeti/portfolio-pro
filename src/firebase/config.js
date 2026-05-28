import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_uic_ufTz_Zy2fyO3bDY8Ri7sqyKRAUE",
  authDomain: "portfolio-web-e6200.firebaseapp.com",
  projectId: "portfolio-web-e6200",
  storageBucket: "portfolio-web-e6200.firebasestorage.app",
  messagingSenderId: "158323545170",
  appId: "1:158323545170:web:7643536b8b41a194777b8b",
  measurementId: "G-WRWS10LT2Q"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);