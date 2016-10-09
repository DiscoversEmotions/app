var config = null;

try {
  config = require('./config')();
} catch (e) {
  console.error('Invalid config');
  console.error(e);
  return;
}

const readline = require('./tools/readline');

// Tasks
const logConfigTask = require('./tasks/logConfig');
const buildClientTask = require('./tasks/buildClient');
const shouldExitTask = require('./tasks/shouldExit');

readline.addExitPromise(function () {
  return new Promise(function(resolve, reject) {
    console.log('Exit in progress...');
    resolve();
  });
});

Promise.resolve(config)
.then(() => logConfigTask(config))
.then(() => buildClientTask(config))
.then(() => shouldExitTask(config))
.catch(e => {
  console.error(e);
});
