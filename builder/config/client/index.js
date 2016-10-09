module.exports = function (paths, params) {
  const babel = require('./babel')();
  const eslint = require('./eslint')();
  const webpack = require('./webpack')(paths, params, babel, eslint);

  return {
    babel,
    webpack,
    eslint
  };
};
