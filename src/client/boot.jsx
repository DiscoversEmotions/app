import React from 'react';
import App from '~/component/App';
import { Core } from '~/core';
import { fromJS } from 'immutable';
import steps from '~/steps';
import { WebGLCore } from '~/webgl';

const appCanvasEl = document.getElementById('app-canvas');
const appUiEl = document.getElementById('app-ui');

const initialState = fromJS({
  width: 600,
  height: 600,
  color: `red`,
  world: {
    current: `room`,
    transitionInProgress: false
  }
});

const core = new Core(
  // state
  steps,
  initialState,
  // UI
  appUiEl,
  <App />,
  // WebGL
  appCanvasEl,
  WebGLCore
);
