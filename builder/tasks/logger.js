class Logger {
  constructor(config, monitor) {
    this._config = config;
    this._monitor = monitor;
    this._init();
  }

  _init() {

  }

  logConfig (config) {
    if (this._monitor !== null) {
      this._monitor.updateConfig(config);
    }
  }

  log() {

  }
}


module.exports = function logger (config, monitor) {
  return new Promise(function(resolve, reject) {
    resolve(new Logger(config, monitor));
  });
};
