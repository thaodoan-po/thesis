const { spawn } = require('child_process');
module.exports = function getNetwork(ref) {
    //execute cmd to get network
    const ls = spawn('ifstat', ['-tSTz', '10']);
    ls.stdout.on('data', data => {
        console.log(`stdout: ${data}`);
        //reg to get network
        var reg = /(\d+:\d+:\d+)\s+\d+.\d+\s+\d+.\d+\s+(\d+.\d+)\s+(\d+.\d+)$/gim;
        var result = reg.exec(data);
        //setdata to firestore 
        ref.doc('network').set({
            time: result[1],
            in: result[2],
            out: result[3]
        });
        console.log(result);
    });
    ls.stderr.on('data', data => {
        console.log(`stderr: ${data}`);
    });
}
