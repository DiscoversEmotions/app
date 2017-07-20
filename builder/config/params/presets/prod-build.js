module.exports = {
  name: 'Production',
  webpack: {
    devtool: '#source-map',
    publicPath: '/remember-experiment/'
  },
  optimize: true,
  watchClient: false,
  monitor: false
}
