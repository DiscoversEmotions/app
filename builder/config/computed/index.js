const _ = require('lodash');

module.exports = function (params) {
  console.log(params.monitor);
  return {
    shouldExit: (!params.watchClient),
    runMonitor: params.monitor !== false
  }
};
