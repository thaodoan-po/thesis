const firebase = require('firebase-admin');
var serviceAccount = require("./service-account-file.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://thaodoan-thesis.firebaseio.com"
});
module.exports = firebase;