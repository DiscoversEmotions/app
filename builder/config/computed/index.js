const _ = require('lodash');

module.exports = function (params) {
  return {
    shouldExit: (!params.watchClient),
    runMonitor: !_.isNil(params.monitor)
  }
};
