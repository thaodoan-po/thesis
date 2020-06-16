var { exec } = require('child_process');
module.exports = function getPort(ref){
    //execute cmd to get information
    exec('sudo lsof -i -P -n | grep LISTEN', (err, stdout, stderr) => {
        console.log(stderr);
        //reg to get port
        var reg = /(\w+)d.\w?\s+\d+\s+\w+.?\w+\s+\w+\s+IPv4\s+\d+\s+\w+\s+(TCP|UDP)\s+(\d+.\d+.\d+.\d+):(\d+)/gim;
        //get port and service
        while(tempPort = reg.exec(stdout)) {
            //set data to firebase realtime database
            ref.child(tempPort[4]).set({
                protocol: tempPort[2],
                service: tempPort[1]
            });
        }
    })
}