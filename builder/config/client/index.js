module.exports = function (paths, params) {
  const babel = require('./babel')();
  const webpack = require('./webpack')(paths, params, babel);

  return {
    babel,
    webpack
  };
};
