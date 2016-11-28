module.exports = {
  name: 'Default',
  webpack: {
    devtool: '#eval-source-map',
    publicPath: '/'
  },
  optimize: false,
  watchClient: true,
  watchClientPort: 3010,
  pageTitle: 'Discovers Emotions App',
  monitor: {
    port: 3011
  }
};
