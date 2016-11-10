import React from 'react';
import { fromJS } from 'immutable';
import App from '~/component/App';
import AppCore from './AppCore';
import { WebGLCore } from '~/webgl';
import { Store } from '~/store';

const appCanvasEl = document.getElementById('app-canvas');
const appUiEl = document.getElementById('app-ui');

const core = new AppCore(
  new Store(),
  appUiEl,
  <App />,
  appCanvasEl,
  WebGLCore
);
