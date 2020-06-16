var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

var serviceAccount = {
    apiKey: "AIzaSyC5-UG6egEihQyr-PoDfvUUNP8Wfvvvp3I",
    authDomain: "thaodoan-thesis.firebaseapp.com",
    databaseURL: "https://thaodoan-thesis.firebaseio.com",
    projectId: "thaodoan-thesis",
    storageBucket: "thaodoan-thesis.appspot.com",
    messagingSenderId: "565251832636",
    appId: "1:565251832636:web:e468f4c7b7eb6f613a7c39",
    measurementId: "G-CH6ZHX4JP4"
};

firebase.initializeApp(serviceAccount);
var readline = require('readline-sync');

console.log('Welcome to Semi application \nYou must have an account to use our services.');


var email = readline.question("Your email: ");
var password = readline.question('Your password: ', { hideEchoBack: true });
var password = readline.question('Password comfirm ', { hideEchoBack: true });
console.log('Register successed');
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
});
var reg = /(\w+)@\w+.\w+/gim;
var temp = reg.exec(email);
const id = temp[1];
module.exports = id;
// var fs = require('fs')
// fs.writeFile('./id.tetx', id, function (err, data) {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(data);
// });