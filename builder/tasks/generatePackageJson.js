const jetpack = require('fs-jetpack');
const _ = require('lodash');

module.exports = function generatePackageJson (config) {
  return new Promise(function(resolve, reject) {
    console.log('=> generatePackageJson');
    var buildPackage = _.pick(config.package, ['name', 'version', 'description', 'dependencies', 'author', 'license']);
    buildPackage.scripts = {
      start: "node server/boot.js"
    }
    jetpack.writeAsync(config.paths.buildPackage, buildPackage)
    .then(resolve)
    .catch(reject);
  });
};
