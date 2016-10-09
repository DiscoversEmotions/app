module.exports = function (params) {
  return {
    shouldExit: (!params.watchClient)
  }
};
