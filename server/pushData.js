const firebase = require('firebase-admin');
var serviceAccount = require("./service-account-file.json");
const { exec } = require('child_process');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://thaodoan-thesis.firebaseio.com"
});
var db = firebase.database();
var ref = db.ref("monitor/users");

ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});
var uidRef = ref.child("001");
var domainRef = uidRef.child("domain");
var didRef = domainRef.child("001");
var procRef = didRef.child("topProcess");
didRef.set({
  name: "minhlanang.vn"
})
var portRef = didRef.child("port");

function pushData(data) {
  this.data = data;
  //Ad OS
  pushData.prototype.addOS = function(os){
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
  pushData.prototype.addDisk = function(label, total, use, remain){
    didRef.child("disk").set({
      label: label,
      total: total,
      used: use,
      remain: remain
    });
  }
  //Add memory
  pushData.prototype.addMem = function(num){
    didRef.child("mem").set({
      used: num
    });
  }
  //Add load average
  pushData.prototype.addLoad = function(num){
    didRef.child("loadAvg").set({
      onesec: num
    });
  }
  //Add Running Process
  pushData.prototype.addTotalProc = function(num){
    didRef.child("totalProc").set({
      total: num
    });
  }
  //Add Top process sort by % mem
  pushData.prototype.addProcess = function(pid, cmd, mem){
    procRef.child(pid).set({
      cmd: cmd,
      mem: mem
    });
  }
  //Add Cpu Utilization
  pushData.prototype.addCpu = function(num){
    didRef.child("cpu").set({
      cpus: num
    })
  }
    //Kill process
  let firstTime = true;
  pushData.prototype.killProc = function(){
    didRef.child("task/cmd").on('value', snapshot => {
      if(firstTime) {
        firstTime = false;
        return;
      }
      // let cmd = snapshot.val();
      // console.log(cmd);
      var script = exec(snapshot.val());
    })
  }
  pushData.prototype.addNetwork = function(){
    exec('ifstat -tSTz 10', (eror, stdout, stderr) => {
        console.log(stdout);
        var reg = /(\d+:\d+:\d+)\s+\d+.?\d+\s+\d+.?\d+\s+(\d+.?\d+)\s+(\d+.?\d+)$/gim;
        var result = reg.exec(stdout);
        console.log(result);
        didRef.child('network').set({
          time: result[1],
          in: result[2],
          out: result[3]
        })
      }
    }).start();
  }
}
module.exports = pushData;
