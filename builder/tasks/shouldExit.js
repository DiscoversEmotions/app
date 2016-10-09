const readline = require('../tools/readline');

module.exports = function (config) {
  if (config.computed.shouldExit) {
    console.log('=> Exit');
    readline.close();
  }
  console.log('=> Builder done, use cmd + C to exit');
}
