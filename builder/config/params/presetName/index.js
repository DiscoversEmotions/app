const jetpack = require('fs-jetpack');
const _ = require('lodash');

/**
 * Take the buildEnv and return a preset name
 */
module.exports = function (buildEnv) {
  const defaultBuildEnvMap = require('./buildEnvMap');

  var buildEnvMap = defaultBuildEnvMap;
  if (jetpack.exists('./buildEnvMap.local.js')) {
    const localMap = require('./buildEnvMap.local.js');
    buildEnvMap = _.merge(defaultBuildEnvMap, localMap);
  }

  if (_.isString(buildEnvMap[buildEnv])) {
    if (buildEnv.match(/.*\.local$/)) {
      console.error(`Warning, the presetFileName contain ".local" which mean it will not overide the non-local preset if it exist.`);
    }
    return buildEnvMap[buildEnv];
  } else {
    console.error(JSON.stringify(buildEnvMap, null, 2));
    throw new Error(`The buildEnvMap above does not contain a key for the buildEnv ${buildEnv}.`);
  }
};
