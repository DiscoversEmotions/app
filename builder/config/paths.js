var path = require('path');

module.exports = function () {
  const paths = {};
  paths.workdir = path.resolve(__dirname, '../../');
    paths.builder = path.resolve(paths.workdir, 'builder');
    paths.nodeModules = path.resolve(paths.workdir, 'node_modules');
    paths.src = path.resolve(paths.workdir, 'src');
      paths.client = path.resolve(paths.src, 'client');
        paths.clientBoot = path.resolve(paths.client, 'boot.jsx');
        paths.clientComponents = path.resolve(paths.client, 'component');
        paths.clientHtmlTemplate = path.resolve(paths.client, 'index.ejs');
      paths.server = path.resolve(paths.src, 'server');
    paths.build = path.resolve(paths.workdir, 'build');
      paths.buildClient = path.resolve(paths.build, 'client');
      paths.buildServer = path.resolve(paths.build, 'server');
        paths.buildServerBoot = path.resolve(paths.buildServer, 'boot.js');
        paths.buildServerPackage = path.resolve(paths.buildServer, 'package.json');
        paths.buildServerProcess = path.resolve(paths.buildServer, 'process.json');

  return paths;
};
