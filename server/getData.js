const push = require('./pushData');
function getData(data) {
   this.data = data;
   var fData = new push(data);
  //Get port, services 
  getData.prototype.getPort = function(){
    var tempPort;
    //Pattern get ports, services, OS
    var reg = /(\w+)d.\w?\s+\d+\s+\w+.?\w+\s+\w+\s+IPv4\s+\d+\s+\w+\s+(TCP|UDP)\s+(\d+.\d+.\d+.\d+):(\d+)/gim;
    var ports = [];
    while(tempPort = reg.exec(data)) {
    //List group pattern
      ports.push([
        tempPort[0],tempPort[1], tempPort[2], tempPort[3], tempPort[4]
      ]);
    //Push to firebase  
      fData.addPort(tempPort[4], tempPort[2], tempPort[1]);
    }
    return ports;
  }

  //Get load average
  getData.prototype.getLoadAvg = function(){
    var reg = /\s.(\d)\s.*:\s(\d{1,2}.\d*)/gim;
    var loadAvg = reg.exec(data);
    fData.addLoad(loadAvg[2]);
    return loadAvg[2];
  }

  //Get mem 
  getData.prototype.getMem = function(){
    var reg = /Mem:\s+(\d{1,2}.\d*)\w\s+(\d*)\w\s+(\d+)\w/gim;
    var mem = reg.exec(data);
    var pUse = mem[2]/mem[1]*100;
    pUse = pUse.toFixed(2);
    fData.addMem(pUse);
    return mem;
  }

  //Get disk 
  getData.prototype.getDisk = function(){
    var reg = /\/dev\/(\w+)\s+(\d+|\d+.\d+)\w\s+(\d+.\d+|\d+)\w\s+(\d+.\d+|\d+)/gim;
    var disk = reg.exec(data);
    fData.addDisk(disk[1], disk [2], disk[3], disk[4])
    return disk;
  }

  //Get running process
  getData.prototype.getTotalProcess = function(){
    var reg = /^\d+$/gim;
    var total = reg.exec(data);
    fData.addTotalProc(total[0]);
    return total[0];
  }
  
  //Get top process sort by %mem
  getData.prototype.getProcess = function(){
    var reg = /^\s+(\d+)\s(\w+-\w+|\w+)\s+(\d+.{2})\s+(\d+.{2})$/gim;
    var temp;
    var process = {};
    while(temp = reg.exec(data)){
      process[temp[1]] = {
        cmd : temp[2],
        mem : temp[3],
        cpu : temp[4]
      }
    }
    fData.addProcess(process)
    return process;
  }

  //Get CPU Utilization
  getData.prototype.getCpu = function(){
    fData.addCpu();
  }
  getData.prototype.getNetwork = function(){
    fData.addNetwork();
  }

  getData.prototype.killProcess = function(){
    fData.killProc();
  }
}
module.exports = getData;