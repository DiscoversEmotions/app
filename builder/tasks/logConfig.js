module.exports = function configTask (config) {
  return new Promise(function(resolve, reject) {
    if (config.computed.runMonitor) {
      resolve();
      return;
    }
    console.log('=> logConfig');
    console.log(JSON.stringify(config, null, 2));
    resolve();
  })
}
