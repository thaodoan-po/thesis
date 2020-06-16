var firebase = require('./firebase');
var db = firebase.database();
var store = firebase.firestore();

//Function get data
var getNetwork = require('./getNetwork');
var getPort = require('./getPort');
var getDiskUsage = require('./getDisk');
const email = require('./register');
//get email to set uid
var uid = email.id;
console.log(tmp);
//store databse path
let sref = store.collection('users/' + uid + '/001');
let ref = db.ref('monitor/users/'+ uid +'/domain/001');
let portRef = ref.child('port');
let procRef = ref.child('processRunning')
//Execute 
//getNetwork(sref);
// getPort(portRef);
getDiskUsage(ref);