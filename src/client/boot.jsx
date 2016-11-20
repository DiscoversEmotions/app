import React from 'react';
import App from '~/component/App';
import AppCore from './AppCore';
import controller from '~/controller';
import { ConnectFunction } from '~/core';

const appCanvasEl = document.getElementById('app-canvas');
const appUiEl = document.getElementById('app-ui');

// Instantiate the core
const core = new AppCore(
  controller,
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

const Connected = ConnectFunction(
  controller,
  (props) => ({
    value: props.propsName
  }),
  {
    buttonClicked: 'buttonClicked'
  }
)((props) => {
  console.log('update : ' + props.value);
});

const demo = new Connected();

demo.update({ propsName: `title` });
demo.update({ propsName: `subTitle` });
