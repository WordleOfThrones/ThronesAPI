import admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL 
    }),
    storageBucket: "wordleofthrones-dc4d1.appspot.com"
  });
  
  console.log('Firebase inicializado com sucesso');
} catch (error) {
  console.error('Erro ao inicializar o Firebase:', error);
}

const bucket = admin.storage().bucket();

export { bucket };
