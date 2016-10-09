const readline = require('readline');

/**
 * This deals with exit of the script
 */
const exitTasks = [];

module.exports = function initReadline () {
  return new Promise(function(resolve, reject) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.on('close', () => {
      const exitPromises = exitTasks.map(task => task());
      console.log(exitPromises.length);
      Promise.all(exitPromises)
      .then(() => {
        console.log('All exit are done !');
      })
      .then(() => { process.exit() })
      .catch((e) => {
        console.error('An error occur while exit process');
        console.error(e);
      })
    });

    function addExitPromise (newProm) {
      exitTasks.push(newProm);
    }

    function close (maxDelay = 1000) {
      rl.close();
    }

    // add exit
    addExitPromise(() => new Promise(function(resolve, reject) {
      console.log('Exit in progress...');
      resolve();
    }));

    resolve({
      addExitPromise,
      close
    });
  });
};
