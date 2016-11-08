import React from 'react';
import App from '~/component/App';
import { Core } from '~/core';
import { Map } from 'immutable';
import steps from '~/steps';

const appCanvasEl = document.getElementById('app-canvas');
const appUiEl = document.getElementById('app-ui');
// const store = createStore(routes);

const initialState = new Map({
  width: 600,
  height: 600,
  color: `red`
});

const core = new Core(
  appCanvasEl,
  appUiEl,
  <App />,
  steps,
  initialState
);
