module.exports = function (paths, params) {
  const babel = require('./babel')();
  const eslint = require('./eslint')();
  const cssModules = require('./cssModules')();
  const vendors = require('./vendors')();
  const webpack = require('./webpack')(paths, params, babel, eslint, cssModules, vendors);

  return {
    babel,
    webpack,
    eslint,
    vendors
  };
};
