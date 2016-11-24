const jetpack = require('fs-jetpack');

module.exports = function generateProcess (config) {
  return new Promise(function(resolve, reject) {
    console.log('=> generateProcess');
    const processConfig = {
      apps: [
        config.server.process
      ]
    };
    jetpack.writeAsync(config.paths.buildProcess, processConfig)
    .then(resolve)
    .catch(reject);
  });
};
