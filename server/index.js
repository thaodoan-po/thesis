var data = require('./getData');
var { exec } = require('child_process');
let upDate = () => {
    exec('sudo lsof -i -P -n | grep LISTEN && uptime && free -m && ps -eo pid,comm,%mem,%cpu --sort=-%mem | head -n 6 && df -h /dev/sda2 && ps aux | wc -l', (e, stdout, stderr) => {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        //console.log(stdout);
        var p = new data(stdout);
        //var cpu = p.getCpu();
        //var os = p.getOS();
        var port = p.getPort();
        var load = p.getLoadAvg();
        var mem = p.getMem();
        var disk = p.getDisk();
        var total = p.getTotalProcess();
        var process = p.getProcess();
        var kill = p.killProcess();
        //console.log(port[0][4], port[0][2], port[0][1]);
    });
};
setInterval(upDate, 30000);
//sudo lsof -i -P -n | grep LISTEN && uptime && free -m && ps -eo pid,comm,%mem,%cpu --sort=-%mem && df -h /dev/sda2 && top -bn1 | grep "Cpu(s)" && ps aux | wc -l
let network = () => {

let p = new data();
p.getNetwork();
}
setInterval(network, 1000);
