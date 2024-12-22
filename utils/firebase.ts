import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG || "")),
    databaseURL: "https://bace-delhi-cms-default-rtdb.asia-southeast1.firebasedatabase.app",
  });
}

export default admin.firestore();
