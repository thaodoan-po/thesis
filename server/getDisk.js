var { exec } = require('child_process');
module.exports = function getDisk(ref) {
    //execute cmd to get information
    exec('df -h /dev/sda2 && ps aux | wc -l', (err, stdout, stderr) => {
        console.log(stderr);
        //reg to get disk usage
        var reg = /\/dev\/(\w+)\s+(\d+|\d+.\d+)\w\s+(\d+.\d+|\d+)\w\s+(\d+.\d+|\d+)/gim;
        var disk = reg.exec(stdout);
        ref.child("disk").set({
            label: disk[1],
            total: disk[2],
            used: disk[3],
            remain: disk[4]
        });
    })
}