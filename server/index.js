
// var j = schedule.scheduleJob('*/10 * * * * *', function(){
// //   console.log('hello world');
const { exec } = require('child_process');
//var data = require('./getData');
// let upDate = () => {
    var script = exec('sudo ifstat -tSTz 10',
    (error, stdout, stderr) => {
        console.log(stdout);
    })
//         var p = new data(stdout);
//         var cpu = p.getCpu();
//         //var os = p.getOS();
//         var port = p.getPort();
//         var load = p.getLoadAvg();
//         var mem = p.getMem();
//         var disk = p.getDisk();
//         var total = p.getTotalProcess();
//         var process = p.getProcess();
//         var kill = p.killProcess();
//         //console.log(port[0][4], port[0][2], port[0][1]);
//         console.log(stderr);
//         if (error !== null) {
//             console.log(`exec error: ${error}`);
//         }
//     });

//     //ip addr show | grep inet | grep 'host lo' => get ip address
//     //lsb_release -a => get OS
// }
// setInterval(upDate,5000);
//sudo lsof -i -P -n | grep LISTEN && uptime && free -m && ps -eo pid,comm,%mem,%cpu --sort=-%mem && df -h /dev/sda2 && top -bn1 | grep "Cpu(s)" && ps aux | wc -l


  //Lệnh cần dùng
  //Lấy ram [free -h]
  //Lấy load average [uptime]
  //Lấy port servie [sudo namp -O localhost]
  //Lấy network [ifstat -tST 10] // 10s sẽ load lại 1 lần 
  //Lấy process đang chạy [ps aux | wc -l]
  //Lấy top chương trình tốn nhiều ram nhất [ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head]
  //Lất top chương trình tốn nhiều CPU nhất [ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head]
  //Lấy trạng thái ổ đĩa [df -h /dev/sda2]
  //sudo nmap -O localhost && uptime && free -m && ps -eo pid,comm,%mem,%cpu --sort=-%mem | head -n 6 && df -h /dev/sda2
