module.exports = {
  name: 'Default',
  webpack: {
    devtool: '#eval-source-map',
    publicPath: '/'
  },
  optimize: false,
  watchClient: true,
  watchClientPort: 3010,
  pageTitle: 'Remember Experiment - Remember Corp',
  monitor: {
    port: 3011
  }
};
