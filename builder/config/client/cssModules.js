module.exports = function () {
  return {
    modules: true,
    importLoaders: 1,
    localIdentName: '[name]__[local]___[hash:base64:5]'
  };
};
