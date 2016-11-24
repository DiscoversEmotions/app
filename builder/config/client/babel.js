const stage0 = require.resolve('babel-preset-stage-0');
const react = require.resolve('babel-preset-react');
const es2015 = require.resolve('babel-preset-es2015');
const decoratorPlugin = require.resolve('babel-plugin-transform-decorators-legacy');
const transformClassProperties = require.resolve('babel-plugin-transform-class-properties');


module.exports = function (paths) {
  return {
    presets: [
      stage0,
      react,
      [es2015, {'modules': false}]
    ],
    plugins: [decoratorPlugin, transformClassProperties]
  };
}
