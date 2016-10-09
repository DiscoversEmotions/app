module.exports = function (paths) {
  const process = require('./process')(paths);

  return {
    process
  };
};
