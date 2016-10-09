
module.exports = function (config, readline) {
  if (config.computed.shouldExit) {
    console.log('=> Exit');
    readline.close();
  }
  console.log('=> Builder done, use cmd + C to exit');
}
