
module.exports = function getConfig () {
  return new Promise(function(resolve, reject) {
    try {
      config = require('../config')();
    } catch (e) {
      console.error('Invalid config');
      reject(e);
      return;
    }
    resolve(config);
  });
};
