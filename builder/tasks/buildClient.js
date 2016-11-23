const jetpack = require('fs-jetpack');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

var server;

module.exports = function buildClient (config, readline, monitor) {
  const paths = config.paths;

  return Promise.resolve()
  .then(() => {
    console.log('=> buildClient');
  })
  .then(() => {
    return new Promise(function(resolve, reject) {
      // Manually push webapck Plugin because I need monitor
      const webpackConfig = config.client.webpack;
      webpackConfig.plugins.push(
        new webpack.ProgressPlugin(function handler(percentage, msg) {
          monitor.updateClientStatus({ percentage, msg });
        })
      )
      const compiler = webpack(config.client.webpack);
      compiler.plugin('done', (stats) => {
        monitor.updateClientStats(stats);
      })

      if (config.params.watchClient) {
        console.log('=> Webpack Watch');
        server = new webpackDevServer(compiler, {
          hot: true,
          quiet: true,
          noInfo: true,
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
        compiler.run(function(err, stats) {

          console.log(stats.toString({
            chunks: false,  // Makes the build much quieter
            colors: true    // Shows colors in the console
          }));
          if (err) {
            console.error(err);
            reject(err);
          } else if (stats.hasErrors()) {
            reject();
          } else {
            // write stats.json
            // jetpack.write(config.paths.stats, stats.toJson('minimal'));
            resolve();
          }
        });
        if (jetpack.exists(paths.build)) {
          return jetpack.removeAsync(paths.build);
        }
        // console.error(`${paths.build} does not exist !`);
        // return;
      }
    });
  })
};
