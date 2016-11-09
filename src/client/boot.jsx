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
  world: {
    current: `room`,
    transitionInProgress: false
  },
  movement: {
    forward: false,
    pointerLocked: false
  },
  step: {
    current: `boot`,
    data: {}
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
