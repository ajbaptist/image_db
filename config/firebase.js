const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tamilmemes-da166-default-rtdb.firebaseio.com"
  });

const db = admin.firestore();

// Other Firebase services can be initialized here if required

module.exports = { admin, db }; // Export initialized Firebase Admin and Firestore
