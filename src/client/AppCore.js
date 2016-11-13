import React from 'react';
import ReactDOM from 'react-dom';
import * as motion from 'popmotion';
import { WindowResizeSingleton, Provider } from '~/core';
import { actions, Steps } from '~/store';
import { Map } from 'immutable';

window.IMap = Map;

/**
 * Core class
 */
export default class AppCore {

  constructor(store, appUiEl, rootElement, appCanvasEl, WebGLCore) {

    this.appUiEl = appUiEl;
    this.appCanvasEl = appCanvasEl;
    this.rootElement = rootElement;

    this.lastState = Map();
    this.lastComputedState = Map();

    this.mainTask = motion.task({
      onUpdate: this.update.bind(this),
      onRender: this.onRender.bind(this),
      onStart: () => {
        console.log(`start !`);
        console.log(window.__START_TIME);
      }
    });
    this.store = store;

    this.webGLCore = new WebGLCore(this.appCanvasEl, this.store);

    WindowResizeSingleton.getInstance().add((width, height) => {
      this.store.dispatch(actions.size.resize(width, height));
    });

    // start
    this.mainTask.start();
  }

  update(task, time, dt) {
    this.store.dispatch(actions.time.setTime(time));

    this.updateView();
    this.updateWebGL(time, dt);
    this.lastState = this.store.state;
    this.lastComputedState = this.store.computedState;
  }

  onRender(task, time, dt) {
    this.webGLCore.render(time, dt);
  }

  updateView() {
    if (this.lastComputedState !== this.store.computedState) {
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
  }

  updateWebGL(time, dt) {
    this.webGLCore.update(time, dt);
  }

}
