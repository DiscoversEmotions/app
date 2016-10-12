module.exports = function (paths, params) {
  const babel = require('./babel')();
  const eslint = require('./eslint')();
  const cssModules = require('./cssModules')();
  const webpack = require('./webpack')(paths, params, babel, eslint, cssModules);

  return {
    babel,
    cssModules,
    webpack,
    eslint
  };
};
