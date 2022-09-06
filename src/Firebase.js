import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYAU23FoAmvsTAViOA-ep6bfGnrIOvSHg",
  authDomain: "bloging-app-2b6aa.firebaseapp.com",
  projectId: "bloging-app-2b6aa",
  storageBucket: "bloging-app-2b6aa.appspot.com",
  messagingSenderId: "998921031139",
  appId: "1:998921031139:web:cf5acda04519c70f05a4d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();