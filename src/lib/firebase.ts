import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXstNG1x25fcZKlsx475ng0IhfA2O4X2U",
  authDomain: "mabica-a916a.firebaseapp.com",
  projectId: "mabica-a916a",
  storageBucket: "mabica-a916a.appspot.com",
  messagingSenderId: "332819317198",
  appId: "1:332819317198:web:0a569d0eef61733e2e2b9f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
