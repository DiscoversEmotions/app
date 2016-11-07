const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (paths, params, babel, eslint, cssModules) {
  const webpackConfig = {
    entry: {
      'app': [paths.clientBoot]
    },
    output: {
      path: paths.buildClient,
      publicPath: '/'
    },
    resolve: {
      alias: {
        '~': paths.client
      },
      extensions: ['.webpack.js', '.web.js', '.js', '.scss', '.glsl', '.jsx']
    },
    module: {
      loaders: [],
    },
    plugins: [],
    devServer: {
      historyApiFallback: true,
      noInfo: true
    },
    devtool: params.webpack.devtool
  };

  webpackConfig.module.loaders.push(
    {
      enforce: 'pre',
      test: /\.js$/,
      loader: `eslint?${JSON.stringify(eslint)}`,
      exclude: /node_modules/
    }
  );

  webpackConfig.module.loaders.push(
    {
      test: /\.scss$/,
      loader: `style!css?${JSON.stringify(cssModules)}!sass`
    },
    {
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: babel
    },
    {
      test: /\.(png|jpg|gif|svg|obj)$/,
      loader: 'file',
      query: {
        name: '[name].[ext]?[hash]'
      }
    },
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.(glsl|vert|frag)$/,
      loader: 'webpack-glsl',
      options: {
        chunksPath: './src/chunks', // Path to look chunks at
        chunksExt: 'glsl', // Chunks extension
        varPrefix: '$' // Every valid name that starts with this symbol will be treated as a template variable
      }
    }
  );

  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: paths.clientHtmlTemplate,
      hash: false,
      title: params.pageTitle,
      filename: 'index.html',
      chunks: ['app'],
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  );

  if (params.optimize) {
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      })
    );
    webpackConfig.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    );
  }
  if (params.watchClient) {
    webpackConfig.entry.app.unshift(`webpack-dev-server/client?http://localhost:${params.watchClientPort}/`, 'webpack/hot/dev-server');
    webpackConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
  }

  return webpackConfig;
};
