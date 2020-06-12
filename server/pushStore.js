const admin = require('firebase-admin');
let serviceAccount = require('./service-account-file.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();
let ref = db.collection('001/domain/001');

function pushStore() {
    pushStore.prototype.addCpu = () => {
        var { exec } = require('child_process');
        exec('top -bn1 | grep "Cpu(s)"', (stdout, stderr) => {
            console.log(stderr);
            var reg = /(\d+|\d+.\d+)\s(id)/gim;
            var temp = reg.exec(stdout);
            var cpu = 100 - temp[1];
            cpu = cpu.toFixed(2);
            if (cpu > 70) {
                followCpu();
            }
            ref.doc('cpu').set({
                cpu: cpu
            })
        });
    }
};
pushStore.prototype.addNet = () => {
    const { spawn } = require('child_process');
    const ls = spawn('ifstat', ['-tSTz', '10']);
    ls.stdout.on('data', data => {
        console.log(`stdout: ${data}`);
        var reg = /(\d+:\d+:\d+)\s+\d+.\d+\s+\d+.\d+\s+(\d+.\d+)\s+(\d+.\d+)$/gim;
        var result = reg.exec(data);
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
 module.exports = pushStore;