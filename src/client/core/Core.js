import React from 'react';
import ReactDOM from 'react-dom';
import * as motion from 'popmotion';

import { WindowResizeSingleton } from './WindowResizeSingleton';
import { Provider } from './Provider';
import { StateManager } from './StateManager';
import { StepsManager } from './StepsManager';

/**
 * Core class
 */
export class Core {

  constructor(steps, initialState, appUiEl, rootElement, appCanvasEl, WebGLCore) {

    this.appUiEl = appUiEl;
    this.appCanvasEl = appCanvasEl;
    this.rootElement = rootElement;

    this.lastState = null;
    this.mainTask = motion.task({
      onUpdate: this.update.bind(this),
      onRender: this.render.bind(this)
    });
    this.stateManager = new StateManager(initialState);
    this.stepsManager = new StepsManager(steps, this.stateManager);

    this.webGLCore = new WebGLCore(this.appCanvasEl, this.stateManager);

    WindowResizeSingleton.getInstance().add((width, height) => {
      this.stateManager.updateState((state) => {
        return state
        .set(`width`, width)
        .set(`height`, height);
      });
    });

    // start
    this.mainTask.start();

  }

  update(task, time, dt) {
    this.stepsManager.update(time, dt);
    this.updateWebGL(time, dt);
    this.updateView(time, dt);
  }

  render(task, time, dt) {
    this.renderWebGL(time, dt);
  }

  updateView(time, dt) {
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

  updateWebGL(time, dt) {
    this.webGLCore.update(time, dt);
  }

  renderWebGL(time, dt) {
    this.webGLCore.render(time, dt);
  }

}
