var config = null;
var monitor = null;
var readline = null;

// Tasks
const readlineTask = require('./tasks/readline');
const getConfigTask = require('./tasks/getConfig');
const logConfigTask = require('./tasks/logConfig');
const buildClientTask = require('./tasks/buildClient');
const buildServerTask = require('./tasks/buildServer');
const generatePackageJsonTask = require('./tasks/generatePackageJson');
const generateProcessTask = require('./tasks/generateProcess');
const builderMonitorTask = require('./tasks/builderMonitor');
const shouldExitTask = require('./tasks/shouldExit');

Promise.resolve(config)
.then(() => readlineTask()).then((rl) => { readline = rl })
.then(() => getConfigTask()).then((conf) => { config = conf })
.then(() => builderMonitorTask(config, readline)).then((monit) => { monitor = monit })
.then(() => logConfigTask(config))
.then(() => buildClientTask(config, readline, monitor))
.then(() => buildServerTask(config))
.then(() => generatePackageJsonTask(config))
.then(() => generateProcessTask(config))
.then(() => shouldExitTask(config, readline))
.catch(e => {
  console.error(e);
  readline.close();
});
