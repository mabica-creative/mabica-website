import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWMqL_pezFxENIj93Q3HEN9ylpxGlkzoc",
  authDomain: "onee-18004.firebaseapp.com",
  projectId: "onee-18004",
  storageBucket: "onee-18004.appspot.com",
  messagingSenderId: "775189859692",
  appId: "1:775189859692:web:17bdc489aaa889aaf1b749",
  measurementId: "G-R08WEZBPBK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
