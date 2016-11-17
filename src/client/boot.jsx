import React from 'react';
import { fromJS } from 'immutable';
import App from '~/component/App';
import AppCore from './AppCore';
// import { WebGLCore } from '~/webgl';
import { Store } from '~/store';

const appCanvasEl = document.getElementById('app-canvas');
const appUiEl = document.getElementById('app-ui');

// Instantiate the core
const core = new AppCore(
  new Store(),
  appUiEl,
  appCanvasEl,
  () => {}
);

// Boot the UI
core.bootUI(<App />);

// Async fetch webgl stuff
System.import('~/webgl').then((result) => {
  // Boot WebGLCore
  core.bootWebgl(result.WebGLCore);
});
