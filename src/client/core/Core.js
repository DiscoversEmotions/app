import React from 'react';
import ReactDOM from 'react-dom';

import { WindowResizeSingleton } from './WindowResizeSingleton';
import { MainLoop } from './MainLoop';
import { Provider } from './Provider';
import { Clock } from './Clock';
import { StateManager } from './StateManager';
import { StepsManager } from './StepsManager';

/**
 * Core class
 */
export class Core {

  constructor(steps, initialState, appUiEl, rootElement, webGLApp) {

    this.webGLApp = webGLApp;
    this.appUiEl = appUiEl;
    this.rootElement = rootElement;

    this.time = null;
    this.dt = null;
    this.lastState = null;
    this.clock = new Clock();
    this.mainLoop = new MainLoop(this.update.bind(this));
    this.stateManager = new StateManager(initialState);
    this.stepsManager = new StepsManager(steps);

    WindowResizeSingleton.getInstance().add((width, height) => {
      this.stateManager.updateState((state) => {
        return state
        .set(`width`, width)
        .set(`height`, height);
      });
    });

    // start
    this.clock.start(); // start clock
    this.mainLoop.start(); // start loop
    this.webGLApp.init(this.stateManager);

  }

  update() {
    // console.log(this.stateManager.state.toJS());
    this.dt = this.clock.getDelta();
    this.time = this.clock.getElapsedTime();
    // Time state changes
    this.stepsManager.update(this.stateManager, this.time, this.dt);
    // Updates
    this.updateView();
    this.updateWebGL();
  }

  updateView() {
    if (this.lastState === this.stateManager.state) {
      return;
    }
    this.lastState = this.stateManager.state;
    // Render view
    ReactDOM.render(
      React.createElement(
        Provider,
        {
          state: this.stateManager.state,
          updateState: this.stateManager.updateState
        },
        this.rootElement
      ),
      this.appUiEl
    );
  }

  updateWebGL() {
    this.webGLApp.update(this.stateManager, this.time, this.dt);
  }

}
