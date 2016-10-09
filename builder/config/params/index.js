const requireDir = require('require-dir');
const _ = require('lodash');

module.exports = function (buildEnv) {
  const presetName = require('./presetName')(buildEnv);

  var presets = requireDir('./presets');

  // remove exemples
  presets = _.omitBy(presets, (val, key) => key.match(/.*\.local\.example$/));
  const defaultParams = presets['default'];
  var params;

  if (_.isNil(presets[presetName]) && _.isNil(presets[presetName + '.local'])) {
    throw new Error(`Can't find preset named "${presetName}" or "${presetName + '.local'}" in presets.`);
  }
  if (!_.isNil(presets[presetName + '.local'])) {
    console.log('found local !');
    var presetToOveride = presets[presetName] || {};
    // default <- preset <- preset.local
    params = _.merge(defaultParams, presetToOveride, presets[presetName + '.local']);
  } else {
    params = _.merge(defaultParams, presets[presetName]);
  }

  params.fileName = presetName;

  return params
};
