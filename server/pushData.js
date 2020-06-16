const { exec } = require('child_process');
var followCpu = require('./followCpu');
var firebase = require('./firebase');
var id = require('./register');
console.log(id);
var db = firebase.database();
var store = firebase.firestore();
//store databse path
let sref = store.collection('users/001/001');
//firebase realtime database path
var ref = db.ref("monitor/users");
var uidRef = ref.child("001");

ref.once("value", function (snapshot) {
  console.log(snapshot.val());
});
//define path
var domainRef = uidRef.child("domain");
var didRef = domainRef.child("001");
var procRef = didRef.child("topProcess");
var portRef = didRef.child("port");

function pushData(data) {
  this.data = data;
  //Ad OS
  pushData.prototype.addOS = function (os) {
    didRef.child("os").set({
      name: os
    });
  }
  //Add port
  pushData.prototype.addPort = function (port, protocol, service) {
    portRef.child(port).set({
      protocol: protocol,
      service: service
    });
  }
  //Add disk usage
  pushData.prototype.addDisk = function (label, total, use, remain) {
    didRef.child("disk").set({
      label: label,
      total: total,
      used: use,
      remain: remain
    });
  }
  //Add memory
  pushData.prototype.addMem = function (num) {
    didRef.child("mem").set({
      used: num
    });
  }
  //Add load average
  pushData.prototype.addLoad = function (num) {
    didRef.child("loadAvg").set({
      onesec: num
    });
  }
  //Add Running Process
  pushData.prototype.addTotalProc = function (num) {
    didRef.child("totalProc").set({
      total: num
    });
  }
  //Add Top process sort by % mem
  pushData.prototype.addProcess = function (processList) {
    procRef.set(processList);
  }
  //Add Cpu Utilization
  pushData.prototype.addCpu = function () {
    var { exec } = require('child_process');
    exec('top -bn1 | grep "Cpu(s)" && top -bn1 | grep "top -"', (err, stdout, stderr) => {
      console.log(stderr);
      var reg = /(\d+|\d+.\d+)\s(id)/gim;
      var temp = reg.exec(stdout);
      var reg2 = /\d+:\d+:\d+/gim;
      var time = reg2.exec(stdout);
      var cpu = 100 - temp[1];
      cpu = cpu.toFixed(2);
      if (cpu > 70) {
        if(followCpu() == 1)
        {
          let ref = store.collection('warning').doc('001')
          .collection('highCpu').doc('time').add({
            timeStart: time[0]
          })
        }
      }
      sref.doc('cpu').set({
        time: time[0],
        cpus: cpu
      })
    })
  }
  //Kill process
  let firstTime = true;
  pushData.prototype.killProc = function () {
    didRef.child("task/cmd").on('value', snapshot => {
      if (firstTime) {
        firstTime = false;
        return;
      }
      var script = exec(snapshot.val());
      didRef.child("task/cmd").set({
        cmd: ''
      })
    })
  }
  //Add Networking
  pushData.prototype.addNetwork = function () {
    const { spawn } = require('child_process');
    const ls = spawn('ifstat', ['-tSTz', '10']);
    ls.stdout.on('data', data => {
      console.log(`stdout: ${data}`);
      var reg = /(\d+:\d+:\d+)\s+\d+.\d+\s+\d+.\d+\s+(\d+.\d+)\s+(\d+.\d+)$/gim;
      var result = reg.exec(data);
      console.log(result[1]);
      sref.doc('network').set({
        time: result[1],
        in: result[2],
        out: result[3]
      });
      console.log(result);
    });
    ls.stderr.on('data', data => {
      console.log(`stderr: ${data}`);
    });
  };
}
module.exports = pushData;