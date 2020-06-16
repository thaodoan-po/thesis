var { exec } = require('child_process');
module.exports = function getMem(ref) {
    //execute cmd to get information
    exec('free -m', (err, stdout, stderr) => {
        console.log(stderr);
        //reg to get mem
        var reg = /Mem:\s+(\d{1,2}.\d*)\w\s+(\d*)\w\s+(\d+)\w/gim;
        var mem = reg.exec(data);
        var pUse = mem[2] / mem[1] * 100;
        pUse = pUse.toFixed(2);
        ref.child("mem").set({
            used: pUse
        });
    })
}