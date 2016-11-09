import React from 'react';
import ReactDOM from 'react-dom';
import * as motion from 'popmotion';
import { WindowResizeSingleton, Provider } from '~/core';
import { actions, Worlds, Steps } from '~/store';

/**
 * Core class
 */
export default class AppCore {

  constructor(store, appUiEl, rootElement, appCanvasEl, WebGLCore) {

    this.appUiEl = appUiEl;
    this.appCanvasEl = appCanvasEl;
    this.rootElement = rootElement;

    this.lastState = null;
    this.mainTask = motion.task({
      onUpdate: this.update.bind(this),
      onRender: this.render.bind(this)
    });
    this.store = store;

    this.store.dispatch(actions.step.setCurrent(Steps.Boot));

    this.webGLCore = new WebGLCore(this.appCanvasEl, this.store);

    WindowResizeSingleton.getInstance().add((width, height) => {
      this.store.dispatch((state) => {
        return state
        .set(`width`, width)
        .set(`height`, height);
      });
    });

    // start
    this.mainTask.start();

  }

  update(task, time, dt) {
    this.stateTimeUpdate(time, dt);
    this.updateWebGL(time, dt);
    this.updateView(time, dt);
  }

  render(task, time, dt) {
    this.renderWebGL(time, dt);
  }

  updateView(time, dt) {
    if (this.lastState === this.store.state) {
      return;
    }
    this.lastState = this.store.state;
    // Render view
    ReactDOM.render(
      React.createElement(
        Provider,
        {
          store: this.store
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

  stateTimeUpdate(time, dt) {
    const step = this.store.get(`step`);
    if (step === Steps.Boot && time > 3000) {
      this.store.dispatch(actions.step.setCurrent(Steps.FoundError));
    }
  }

}
