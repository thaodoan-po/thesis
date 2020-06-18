var { exec } = require('child_process');
module.exports = function getTotalProcess(ref) {
    //execute cmd to get information
    exec('ps axu | wc -l', (err, stdout, stderr) => {
        console.log(stderr);
        var reg = /^\d+$/gim;
        var total = reg.exec(stdout);
        ref.child("totalProc").set({
            total: total[0]
        });
    })
}