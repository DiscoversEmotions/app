import React from 'react';
import ReactDOM from 'react-dom';

import { WindowResizeSingleton } from './WindowResizeSingleton';
import { MainLoop } from './MainLoop';
import { Provider } from './Provider';
import { Clock } from './Clock';
import { StateManager } from './StateManager';

/**
 * Core class
 */
export class Core {

  constructor(appCanvasEl, appUiEl, rootElement, steps, initialState) {

    this.appCanvasEl = appCanvasEl;
    this.appUiEl = appUiEl;
    this.rootElement = rootElement;

    this.clock = new Clock();
    this.mainLoop = new MainLoop(this.update.bind(this));
    this.stateManager = new StateManager(
      steps,
      initialState,
      this.onStateUpdate.bind(this)
    );

    WindowResizeSingleton.getInstance().add((width, height) => {
      this.stateManager.updateState((state) => {
        return state
        .set(`width`, width)
        .set(`height`, height);
      });
    });

    this.clock.start(); // start clock
    this.mainLoop.start(); // start loop

  }

  update() {
    var dt = this.clock.getDelta();
    var time = this.clock.getElapsedTime();
    this.stateManager.update(time, dt);
  }

  onStateUpdate(state, updateState) {
    ReactDOM.render(
      React.createElement(
        Provider,
        { state, updateState },
        this.rootElement
      ),
      this.appUiEl
    );
  }

}
