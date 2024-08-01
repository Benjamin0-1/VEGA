const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // this is the service account key that was downloaded from firebase.

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});

module.exports = firebaseAdmin;
