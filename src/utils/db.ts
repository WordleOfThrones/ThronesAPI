import admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

try {
  admin.initializeApp({
    credential: admin.credential.cert(require(path.resolve(process.env.FIREBASE_KEY_PATH!))),
    storageBucket: "wordleofthrones-dc4d1.appspot.com"
  });
  console.log('Firebase inicializado com sucesso');
} catch (error) {
  console.error('Erro ao inicializar o Firebase:', error);
}

const bucket = admin.storage().bucket();

export { bucket };
