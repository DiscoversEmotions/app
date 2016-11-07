const Express = require('express');
const SocketIO = require('socket.io');
const Http = require('http');
const path = require('path');
const browserify = require('browserify-middleware');
const babelify = require('babelify');
const sassMiddleware = require('node-sass-middleware');
const _ = require('lodash');

var monitorApp = null;

class BuilderMonitor {
  constructor(config, readline) {
    this._readline = readline;
    this._monitorConfig = config.params.monitor;
    this._runMonitor = config.computed.runMonitor
    this._app = null;
    this._server = null;
    this._socket = null;
    // data
    this._config = config;
    this._clientStats = null;
    this._clientStatus = 'unknow';
    // Init
    if (this._runMonitor) {
      this._init();
    }
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

  updateClientStats(stats) {
    this._updateClientStats(stats);
  }

  updateClientStatus(data) {
    this._updateClientStatus(data);
  }

  _init() {
    this._initServer();
    this._server = Http.createServer(this._app);
    this._initSocket();
    // Add exit handler
    this._readline.addExitPromise(() => new Promise((resolve, reject) => {
      console.log('=> Stop builderMonitor');
      this._server.close();
      resolve();
    }))
  }

  _initServer() {
    const app = Express();
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
      res.sendFile(path.resolve(__dirname, '../../node_modules/normalize.css/normalize.css'));
    });
    // Store
    this._app = app;
  }

  _initSocket() {
    this._io = SocketIO(this._server);
    this._io.on('connection', (socket) => {
      this._socket = socket;
      socket.on('restart-server', () => {
        console.log('restart-server');
      });
      this._sendClientStats();
      this._sendConfig();
      this._sendClientStatus
    });
  }

  _trySend(key, data) {
    if (this._socket !== null) {
      this._socket.emit(key, data);
    }
  }

  _updateClientStats(stats) {
    this._clientStats = stats;
    this._sendClientStats();
  }
  _sendClientStats() {
    if (_.isNil(this._clientStats)) {
      this._trySend('client-stats', null);
    } else {
      this._trySend('client-stats', this._clientStats.toJson('vervose'));
    }
  }

  _updateConfig(conf) {
    this._config = conf;
    this._sendConfig();
  }
  _sendConfig() {
    this._trySend('config', this._config);
  }

  _updateClientStatus(data) {
    this._clientStatus = data;
    this._sendClientStatus();
  }
  _sendClientStatus(data) {
    this._trySend('client-status', this._clientStatus);
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
