var { exec } = require('child_process');
const followCpu = require('./followCpu');
module.exports = function getCpu(ref) {
    //execute cmd to get information
    exec('top -bn1 | grep "Cpu(s)" && top -bn1 | grep "top -"', (err, stdout, stderr) => {
        console.log(stderr);
        //reg to get cpu and time
        var reg = /(\d+|\d+.\d+)\s(id)/gim;
        var reg2 = /\d+:\d+:\d+/gim;
        //get cpu and time
        var temp = reg.exec(stdout);
        var time = reg2.exec(stdout);
        //calculate cpu 
        // %cpu = 100 - % ind
        var cpu = 100 - temp[1];
        //rounding
        cpu = cpu.toFixed(2);
        if (cpu > 70) {
            if (followCpu() == 1) {
                ref.doc('warning').add({
                    timeStart: time[0]
                })
                sendEmail();
            }
        }
        //set data to firestore
        ref.doc('cpu').set({
            time: time[0],
            cpus: cpu
        })
    })
}
