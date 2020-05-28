const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const SSH = require('simple-ssh');
var schedule = require('node-schedule');
var data = require('./getData');
//var network = require('./getNetwork');

// const PORT = process.env.PORT || 4001; 

// const router = require('./router');

// const app = express();
// const sever = http.createServer(app);
// const io = socketio(sever);

// io.on('connection', (socket) => {
//     console.log('We have a new connection');
//     socket.on('disconnect', () => {
//         console.log('User had left');
//     });
// });

// app.use(router);

// app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

var ssh = new SSH({
  host: '192.168.199.129',
  user: 'administrator',
  pass: '12345678'
});

//  ssh.exec('sudo nmap -O localhost && uptime && free -m && ps -eo pid,comm,%mem,%cpu --sort=-%mem | head -n 6 && df -h /dev/sda2 && top -bn1 | grep "Cpu(s)" && ps aux | wc -l', {
//    out: function(stdout) {
//        console.log(stdout);
//    }
// }).start();

// var j = schedule.scheduleJob('*/10 * * * * *', function(){
// //   console.log('hello world');
ssh
  .exec('sudo nmap -O localhost && uptime && free -m && ps -eo pid,comm,%mem --sort=-%mem | head -n 6 && df -h /dev/sda2 && top -bn1 | grep "Cpu(s)" && ps aux | wc -l', {
    pty: true,
    exit: function(code, stdout, stderr){
        if(stderr)
        {
            console.log(stderr);
        }
        console.log(stdout);
        var p = new data(stdout);
        var cpu = p.getCpu();
        var os = p.getOS();
        var port = p.getPort();
        var load = p.getLoadAvg();
        var mem = p.getMem();
        var disk = p.getDisk();
        var total = p.getTotalProcess();
        var process = p.getProcess();
  //       //console.log(os);
  //       //console.log(port);
  //       //console.log(load);
  //       //console.log(mem);
  //       //console.log(disk);
  //       //console.log(total);
  //       //console.log(process);
            console.log(cpu);
  }})
.start();
//});
var  p = new data();
p.getNetwork();

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