const jetpack = require('fs-jetpack');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const readline = require('../tools/readline');

var server;

module.exports = function buildClient (config) {
  const paths = config.paths;

  return Promise.resolve()
  .then(() => {
    console.log('=> buildClient');
  })
  .then(() => {
    return new Promise(function(resolve, reject) {
      const compiler = webpack(config.client.webpack);
      var resolved = false;

      if (config.params.watchClient) {
        console.log('=> Webpack Watch');
        server = new webpackDevServer(compiler, {
          hot: true,
          clientLogLevel: 'info',
          quiet: false,
          noInfo: false,
          stats: { colors: true }
        });
        server.listen(config.params.watchClientPort, (err) => {
          if (err) {
            reject(err);
          }
          readline.addExitPromise(() => new Promise(function(resolve, reject) {
            console.log('=> Stop webpackDevServer');
            server.close();
            resolve();
          }));
          resolve();
        });
      } else {
        // Build prod
        console.log('TODO');
        compiler.run(function(err, stats) {
          console.log('Build done !')
          resolve();
        });
        // if (jetpack.exists(paths.build)) {
        //   return jetpack.removeAsync(paths.build);
        // }
        // console.error(`${paths.build} does not exist !`);
        // return;
      }
    });
  })
};
