module.exports = {
  name: 'Production',
  webpack: {
    devtool: '#source-map',
    publicPath: '/dmii/2018/remember/'
  },
  optimize: true,
  watchClient: false,
  monitor: false
}
