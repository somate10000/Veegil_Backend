require("dotenv").config();

module.exports = {
  apiKey: "AIzaSyCd3kMUI4Y0dSSSjW1j4e8JpvRSeHjdPlQ",
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};
