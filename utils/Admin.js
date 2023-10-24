const admin = require("firebase-admin");
const serviceAccount = require("../firebase.json");

// connecting firebase-admin

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      "https://cash-282015-default-rtdb.europe-west1.firebasedatabase.app",
  });
}

const db = admin.firestore();

module.exports = { admin, db };
