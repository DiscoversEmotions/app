import React from 'react';
import App from '~/component/App';
import AppCore from './AppCore';
import createController from '~/controller';

const appCanvasEl = document.getElementById('app-canvas');
const appUiEl = document.getElementById('app-ui');

// Instantiate the core
const core = new AppCore(
  createController,
  appUiEl,
  appCanvasEl,
  () => {}
);

// Boot the UI
core.bootUI(<App />);

// Async fetch webgl stuff
// System.import('~/webgl').then((result) => {
//   // Boot WebGLCore
//   core.bootWebgl(result.WebGLCore);
// });
