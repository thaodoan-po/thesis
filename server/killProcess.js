var { exec } = require('child_process');
module.exports = function killProcess(ref) {
let firstTime = true;
  pushData.prototype.killProc = function () {
    ref.child("task/cmd").on('value', snapshot => {
      if (firstTime) {
        firstTime = false;
        return;
      }
      var script = exec(snapshot.val());
      ref.child("task/cmd").set({
        cmd: ''
      })
    })
  }
}