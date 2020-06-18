var firebase = require('./firebase');
var db = firebase.database();
var store = firebase.firestore();

//Function get data
var getNetwork = require('./getNetwork');
var getPort = require('./getPort');
var getDiskUsage = require('./getDisk');
var getDisk = require('./getDisk');
var getLoadAvg = require('./getLoadAvg');
var getMem = require('./getMem');
var getProcessRunning = require('./getProcessRunning');
var getTotalProcess = require('./getTotalProcess');
var getCpu = require('./getCpu');
const register = require('./register');
const getCpus = require('./getCpus');
//get email to set uid
var uid = register.id;
console.log(uid);
//store databse path
let sref = store.collection('users/' + uid + '/001');
let ref = db.ref('monitor/users/'+ uid +'/domain/001');
let portRef = ref.child('port');
let procRef = ref.child('procRunning')
//Execute 
getNetwork(sref);
getCpu(sref);
getPort(portRef);
getDiskUsage(ref);
getLoadAvg(ref);
getProcessRunning(procRef);
getDisk(ref);
getCpus(ref);
getMem(ref);
getTotalProcess(ref);