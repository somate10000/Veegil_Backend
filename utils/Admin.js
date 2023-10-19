const admin = require("firebase-admin");
const serviceAccount = require("../firebase.json");

// connecting firebase-admin

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://next-auth-efcff.firebaseio.com",
  });
}

const db = admin.firestore();

module.exports = { admin, db };
