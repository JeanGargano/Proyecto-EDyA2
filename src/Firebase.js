//Archivo de configuracion a la base de datos de firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";   
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3TzxYGcO2e9FsL0aq9GugaUQFnyT9hp4",
  authDomain: "eda2-9f933.firebaseapp.com",
  projectId: "eda2-9f933",
  storageBucket: "eda2-9f933.appspot.com",
  messagingSenderId: "349261525108",
  appId: "1:349261525108:web:edb1987a9005441d216121"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)