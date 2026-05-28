import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBUmFTQK7hSJnn6c5wLQjEHkTA3NQA0f3Q",
  authDomain: "portfolio-generator-a58a3.firebaseapp.com",
  projectId: "portfolio-generator-a58a3",
  storageBucket: "portfolio-generator-a58a3.appspot.com",
  messagingSenderId: "502027378813",
  appId: "1:502027378813:web:9f9485dc85d013006b9114",
  measurementId: "G-7GVZS66DF5"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
export const ts = serverTimestamp
