import admin from 'firebase-admin';

// Ajusta el path a tu archivo de cuenta de servicio
const serviceAccount = 'Middleware/serviceAccount.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),  // Usa las credenciales de tu cuenta de servicio
  storageBucket: "gs://pruebafirebase-233d0.appspot.com"
});

export default admin;