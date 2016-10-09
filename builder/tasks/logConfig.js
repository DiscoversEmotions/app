module.exports = function configTask (config) {
  return new Promise(function(resolve, reject) {
    console.log('=> logConfig');
    console.log(JSON.stringify(config, null, 2));
    resolve();
  })
}
