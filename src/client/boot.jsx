import React from 'react';
import App from '~/component/App';
import { Core } from '~/core';
import { Map } from 'immutable';
import steps from '~/steps';
import { WebGLApp } from '~/webgl';

const appCanvasEl = document.getElementById('app-canvas');
const appUiEl = document.getElementById('app-ui');

const initialState = new Map({
  width: 600,
  height: 600,
  color: `red`
});

const core = new Core(
  // state
  steps,
  initialState,
  // UI
  appUiEl,
  <App />,
  // WebGL
  new WebGLApp(appCanvasEl)
);
