// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWB7_IbAUsaCbYxBOpuK2_Oo5JoYgfHYU",
  authDomain: "project-eas-9b087.firebaseapp.com",
  projectId: "project-eas-9b087",
  storageBucket: "project-eas-9b087.appspot.com",
  messagingSenderId: "558516864586",
  appId: "1:558516864586:web:affd5dd6f856af3eb748b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const db = getFirestore();
export default app;
// import { db } from '../firebase.js' // untuk di page yang berhubungan dengan db
// export const auth = getAuth(app);