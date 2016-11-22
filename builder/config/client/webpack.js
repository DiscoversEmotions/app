const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (paths, params, babel, eslint, cssModules) {
  /**
   * Base
   */

  const webpackConfig = {
    entry: {
      'app': [paths.clientBoot]
    },
    output: {
      path: paths.buildClient,
      publicPath: '/',
      pathinfo: false,
    },
    resolve: {
      alias: {
        '~': paths.client
      },
      extensions: ['.webpack.js', '.web.js', '.js', '.scss', '.glsl', '.jsx']
    },
    module: {
      rules: [],
    },
    plugins: [],
    devServer: {
      historyApiFallback: true,
      noInfo: true
    },
    devtool: params.webpack.devtool
  };

  /**
   * Rules
   */

  webpackConfig.module.rules.push(
    {
      enforce: 'pre',
      test: /\.js$/,
      loader: `eslint-loader?${JSON.stringify(eslint)}`,
      exclude: /node_modules/
    }
  );

  webpackConfig.module.rules.push(
    {
      test: /\.scss$/,
      loader: `style-loader!css-loader?${JSON.stringify(cssModules)}!sass-loader`
    },
    {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: babel
    },
    {
      test: /\.(png|jpg|gif|svg|obj)$/,
      loader: 'file-loader',
      query: {
        name: '[name].[ext]?[hash]'
      }
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.(glsl|vert|frag)$/,
      loader: 'webpack-glsl-loader',
      options: {
        chunksPath: './src/chunks', // Path to look chunks at
        chunksExt: 'glsl', // Chunks extension
        varPrefix: '$' // Every valid name that starts with this symbol will be treated as a template variable
      }
    }
  );

  /**
   * Plugins
   */

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

  webpackConfig.plugins.push(
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise'
    })
  );
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  );

  /**
   * Dev
   */

  if (params.optimize) {
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false
        },
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
