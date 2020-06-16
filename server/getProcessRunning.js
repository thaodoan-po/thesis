var { exec } = require('child_process');
module.exports = function getProcessRunning(ref) {
    //execute cmd to get information
    exec('ps -eo pid,comm,%mem,%cpu --sort=-%mem', (err, stdout, stderr) => {
        var reg = /^\s+(\d+)\s(\w+-\w+|\w+)\s+(\d+.{2})\s+(\d+.{2})$/gim;
        var temp;
        var process = {};
        while (temp = reg.exec(data)) {
            process[temp[1]] = {
                cmd: temp[2],
                mem: temp[3],
                cpu: temp[4]
            }
        }
        ref.set(processList)
    })
}