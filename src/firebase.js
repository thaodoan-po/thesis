import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyC5-UG6egEihQyr-PoDfvUUNP8Wfvvvp3I",
    authDomain: "thaodoan-thesis.firebaseapp.com",
    databaseURL: "https://thaodoan-thesis.firebaseio.com",
    projectId: "thaodoan-thesis",
    storageBucket: "thaodoan-thesis.appspot.com",
    messagingSenderId: "565251832636",
    appId: "1:565251832636:web:e468f4c7b7eb6f613a7c39",
    measurementId: "G-CH6ZHX4JP4"
}
const app = firebase.initializeApp(config);
const db = app.database();
const store = app.firestore();
//let ref = db.ref('monitor/users/001/domain/001/disk');
// var array = [];
// ref.on('value', snapshot => {
//     var lable = snapshot.child('lable').val();
//     var toal = snapshot.child('total').val();
//     var use = snapshot.child('use').val();
//     var remain = snapshot.child('remain').val();
//     var numUse = parseInt(use, 10)/parseInt(toal, 10)*100;
//     var numRemain = 100 - numUse;
//     array.push(`{name: used, value:`+ numUse +`}`, `{name: remain, value: ` + numRemain + `}`);
//     console.log(array);
// // });
//     let port = db.ref('monitor/users/001/domain/001/port');
//     port.on('value', snapshot => {
//         console.log(snapshot.val());
//         console.log('DATA RETRIEVED');
//     });
export {db, store};