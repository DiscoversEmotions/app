const Express = require('express');
const SocketIO = require('socket.io');
const Http = require('http');
const path = require('path');
const browserify = require('browserify-middleware');
const babelify = require('babelify');
const sassMiddleware = require('node-sass-middleware');
const _ = require('lodash');

const monitorFacade = {};
var monitorApp = null;

class BuilderMonitor {
  constructor(config, readline) {
    this._config = config;
    this._readline = readline;
    this._monitorConfig = config.params.monitor;
    this._runMonitor = config.computed.runMonitor
    this._app = null;
    this._server = null;
    this._init();
  }

  _init() {
    if (!this._runMonitor) {
      return;
    }
    const app = Express();
    const server = Http.createServer(app);
    const io = SocketIO(server);
    io.on('connection', (socket) => {
      socket.emit('config', this._config);
    });
    // use ejs template
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'index.html'));
    });
    // Javascript
    app.get('/app.js', browserify(
      path.resolve(__dirname, 'js/boot.js'),
      {
        gzip: false,
        minify: false,
        debug: true,
        transform: [
          babelify.configure({
            presets: ['stage-0', 'es2015'],
            plugins: [
              ['transform-react-jsx', { 'pragma': 'h' }]
            ],
            babelrc: false
          }),
          [
            'aliasify',
            {
              'aliases': {
                'jsx-create-element': './jsx-create-element.js'
              },
              'configDir': path.resolve(__dirname, 'js')
            }
          ]
        ]
      }
    ));
    // SASS
    app.use(sassMiddleware({
      src: path.resolve(__dirname, 'style'),
      debug: false,
      prefix: '/style',
      response: true
    }));
    app.get('/normalize.css', function(req, res) {
      res.sendFile(path.resolve(__dirname, '../../../node_modules/normalize.css/normalize.css'));
    });
    // Store
    this._app = app;
    this._server = server;
    // Add exit
    this._readline.addExitPromise(() => new Promise((resolve, reject) => {
      console.log('=> Stop builderMonitor');
      this._server.close();
      resolve();
    }))
  }

  start() {
    return new Promise((resolve, reject) => {
      if (!this._runMonitor) {
        resolve();
      } else {
        const port = this._monitorConfig.port;
        this._server.listen(port, function () {
          console.log(`Example app listening on ${port} !`);
          resolve();
        });
      }
    });
  }

  updateConfig (newConfig) {

  }
}

module.exports = function builderMonitor (config, readline) {
  return new Promise(function(resolve, reject) {
    console.log('=> builderMonitor');
    const monitor = new BuilderMonitor(config, readline);
    monitor.start()
    .then(() => { resolve(monitor) })
    .catch((e) => {
      console.error(e);
    })
  });
};
