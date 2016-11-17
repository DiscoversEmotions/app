import React from 'react';
import ReactDOM from 'react-dom';
import * as motion from 'popmotion';
import { WindowResizeSingleton, Provider, AssetsManager } from '~/core';
import { Steps } from '~/types';
import { Map } from 'immutable';

window.IMap = Map;

/**
 * Core class
 */
export default class AppCore {

  constructor(store, appUiEl, appCanvasEl) {

    this.appUiEl = appUiEl;
    this.appCanvasEl = appCanvasEl;

    this.webGLCore = null;
    this.rootElement = null;

    this.lastState = Map();

    this.mainTask = motion.task({
      onUpdate: this.update.bind(this),
      onRender: this.render.bind(this),
      onStart: () => {
        console.log(`start !`);
        console.log(window.__START_TIME);
      }
    });
    this.store = store;

    WindowResizeSingleton.getInstance().add((width, height) => {
      this.store.dispatch(this.store.actions.size.resize(width, height));
    });

    this.assetsManager = new AssetsManager(this.store);

    // start
    this.mainTask.start();
  }

  bootUI(rootElement) {
    this.rootElement = rootElement;
  }

  bootWebgl(WebGLCore) {
    this.webGLCore = new WebGLCore(this.appCanvasEl, this.store);
  }

  update(task, time, dt) {
    this.store.dispatch(this.store.actions.time.setTime(time));

    this.updateAssetsManager();
    this.updateView();
    this.updateWebGL(time, dt);
    this.lastState = this.store.state;
  }

  render(task, time, dt) {
    if (!this.webGLCore) {
      return;
    }
    this.webGLCore.render(time, dt);
  }

  updateAssetsManager() {
    this.assetsManager.update();
  }

  updateView() {
    if (!this.rootElement) {
      return;
    }
    if (this.lastState !== this.store.state) {
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
    if (!this.webGLCore) {
      return;
    }
    this.webGLCore.update(time, dt);
  }

}
