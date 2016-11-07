module.exports = function () {
  return {
    presets: [
      'stage-0',
      'react',
      ['es2015', {'modules': false}]
    ],
    plugins: ['transform-decorators-legacy']
  };
}
