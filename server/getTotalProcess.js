var { exec } = require('child_process');
module.exports = function getTotalProcess(ref){
    //execute cmd to get information
    exec('ps axu | wc -l', (err, stdout, stderr) => {
        console.log(stderr);
        ref.child("totalProc").set({
            total: stdout
        });
    })
}