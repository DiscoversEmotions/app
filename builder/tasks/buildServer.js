const jetpack = require('fs-jetpack');
const chokidar = require('chokidar');

module.exports = function buildServer (config) {
  const paths = config.paths;

  return Promise.resolve()
  .then(() => {
    console.log('=> buildServer');
  })
  .then(() => jetpack.removeAsync(paths.buildServer))
  .then(() => jetpack.copyAsync(
    paths.server,
    paths.buildServer
  ));
};
