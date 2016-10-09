/**
 * This deals with exit of the script
 */

const readline = require('readline');

const exitTasks = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on('close', () => {
  const exitPromises = exitTasks.map(task => task());
  Promise.all(exitPromises)
  .then(() => {
    console.log('All exit are done !');
  })
  .then(() => { process.exit() });
});

function addExitPromise (newProm) {
  exitTasks.push(newProm);
}

function close (maxDelay = 1000) {
  rl.close();
}

module.exports = {
  addExitPromise,
  close
};
