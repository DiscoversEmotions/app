const jetpack = require('fs-jetpack');

module.exports = function generateProcess (config) {
  return new Promise(function(resolve, reject) {
    console.log('=> generateProcess');
    const processConfig = {
      apps: [
        {
          name: 'discovers-emotion-app',
          script: config.paths.buildServerBoot,
          watch: false,
        }
      ]
    };
    jetpack.writeAsync(config.paths.buildserverProcess, processConfig)
    .then(resolve)
    .catch(reject);
  });
};
