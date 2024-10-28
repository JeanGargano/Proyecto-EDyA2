//Archivo de configuracion a la base de datos de firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";   
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACbr68AV2amtseVrmUo18c2_xnm37_FwQ",
  authDomain: "pruebafirebase-233d0.firebaseapp.com",
  projectId: "pruebafirebase-233d0",
  storageBucket: "pruebafirebase-233d0.appspot.com",
  messagingSenderId: "21924744230",
  appId: "1:21924744230:web:f16460c5bcb57513c46ae7",
  measurementId: "G-N3P0VFJCHP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)