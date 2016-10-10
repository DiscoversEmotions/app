const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (paths, params, babel, eslint) {
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
        '~': paths.clientComponents
      },
      extensions: ['.webpack.js', '.web.js', '.js', '.vue']
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
      loader: `eslint-loader?${JSON.stringify(eslint)}`,
      exclude: /node_modules/
    }
  );

  webpackConfig.module.loaders.push(
    {
      test: /\.vue$/,
      loader: 'vue'
    },
    {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: babel
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file',
      query: {
        name: '[name].[ext]?[hash]'
      }
    }
  );

  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      vue: {
        loaders: {
          js: `babel?${JSON.stringify(babel)}`,
          sass: 'style!css!sass?indentedSyntax',
          scss: 'style!css!sass'
        }
      }
    })
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
