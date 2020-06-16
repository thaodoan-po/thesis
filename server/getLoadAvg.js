var { exec } = require('child_process');
module.exports = function getLoadAvg(ref) {
    //execute cmd to get information
    exec('uptime', (err, stdout, stderr) => {
        console.log(stderr);
        //reg to get loadavg
        var reg = /\s.(\d)\s.*:\s(\d{1,2}.\d*)/gim;
        var loadAvg = reg.exec(stdout);
        ref.child("loadAvg").set({
            onesec: loadAvg[2]
        });
    })
}