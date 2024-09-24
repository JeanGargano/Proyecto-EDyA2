//Archivo de configuracion a la base de datos de firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";   
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRJ4kIp9jwMwVi-w7GeOwQjj-M5ZmDExE",
  authDomain: "proyecto-edya2.firebaseapp.com",
  projectId: "proyecto-edya2",
  storageBucket: "proyecto-edya2.appspot.com",
  messagingSenderId: "308303524322",
  appId: "1:308303524322:web:d6b78b8fea361706d7c9bb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)