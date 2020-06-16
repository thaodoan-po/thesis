const { exec } = require('child_process');
var schedule = require('node-schedule');
module.exports = function followCPU(){
    var data = [];
    var startTime = new Date().getTime()/1000;
    var waitTime = 30000;
    //var endTime = startTime + waitTime;
    while ((new Date().getTime()/1000) - startTime < waitTime) {
        var script = exec('sudo top -bn1 | grep "Cpu(s)"', (error, stdout, stderr) => {
            var reg = /(\d+|\d+.\d+)\s(id)/gim;
            var temp = reg.exec(stdout);
            var cpu = 100 - temp[1];
            cpu = cpu.toFixed(2);
            data.push(cpu);
        });
    }
    var count = 0;
    data.forEach(i => {
        if(data[i] > 70)
        {
            count++;
        }
    });
    if(data.length - count == 0)
    {
        return 1;   
    }
    else return 0;    
}