import React from 'react';
import { fromJS } from 'immutable';
import App from '~/component/App';
import AppCore from './AppCore';
import { WebGLCore } from '~/webgl';
import { Store } from '~/store';

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

const core = new AppCore(
  new Store(),
  appUiEl,
  <App />,
  appCanvasEl,
  WebGLCore
);
