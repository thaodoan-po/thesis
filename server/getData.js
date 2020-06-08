const push = require('./pushData');
const { exec } = require('child_process');
function getData(data) {
  this.data = data;
  var fData = new push(data);
  //Get OS
  getData.prototype.getOS = function(){
    var reg = /OS\sdetails:\s(\w.*)/gim;
    var OS = reg.exec(data);
    fData.addOS(OS[1]);
    return OS[1];
  }

  //Get port, services 
  getData.prototype.getPort = function(){
    var tempPort;
    //Pattern get ports, services, OS
    var reg = /(\d+)\/(\w{2}p)\s+open(?:\|filtered)*\s+(\w+)/gim;
    var ports = [];
    while(tempPort = reg.exec(data)) {
    //List group pattern
      ports.push([
        tempPort[0],tempPort[1], tempPort[2], tempPort[3]
      ]);
    //Push to firebase  
      fData.addPort(tempPort[1], tempPort[2], tempPort[3]);
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
    var reg = /^\s(\d+)\s+([a-z]+|[a-z]+-[a-z]+|[a-z]+\d)\s+(\d+.\d+)$/gim;
    var temp;
    var process = [];
    while(temp = reg.exec(data)){
      process.push([
        temp[1], temp[2], temp[3]
      ]);
      fData.addProcess(temp[1], temp[2], temp[3])
    }
    return process;
  }

  //Get CPU Utilization
  getData.prototype.getCpu = function(){
    var reg = /(\d+|\d+.\d+)\s(id)/gim;
    var temp = reg.exec(data);
    var cpu = 100 - temp[1];
    cpu = cpu.toFixed(2);
    fData.addCpu(cpu);
    return cpu;
  }
  getData.prototype.getNetwork = function(){
    fData.addNetwork();
  }
  getData.prototype.killProcess = function(){
    fData.killProc();
  }
}
module.exports = getData;
