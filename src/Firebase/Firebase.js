// Importa las funciones necesarias del SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // Agrega esta línea

// Configuración de tu aplicación web en Firebase
const firebaseConfig = {
  apiKey: "AIzaSyACbr68AV2amtseVrmUo18c2_xnm37_FwQ",
  authDomain: "pruebafirebase-233d0.firebaseapp.com",
  databaseURL: "https://pruebafirebase-233d0-default-rtdb.firebaseio.com",
  projectId: "pruebafirebase-233d0",
  storageBucket: "pruebafirebase-233d0.appspot.com",
  messagingSenderId: "21924744230",
  appId: "1:21924744230:web:f16460c5bcb57513c46ae7",
  measurementId: "G-N3P0VFJCHP"
};

// Inicializa Firebase
export const app = initializeApp(firebaseConfig);

// Exporta las instancias de autenticación, Firestore y Realtime Database
export const db = getFirestore(app);
export const auth = getAuth(app);
export const realtimeDb = getDatabase(app); // Agrega esta línea para Realtime Database
