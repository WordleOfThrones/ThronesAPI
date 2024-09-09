import admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(require(path.resolve(process.env.FIREBASE_KEY_PATH!))),
  storageBucket: "gs://wordleofthrones-dc4d1.appspot.com"
});

const bucket = admin.storage().bucket();

export { bucket };
