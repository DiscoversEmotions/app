import React from 'react';
import ReactDOM from 'react-dom';
import * as motion from 'popmotion';
import { WindowResizeSingleton, AssetsManager, ConnectFunction } from '~/core';
import { Steps } from '~/types';
import { Container } from 'cerebral/react';

/**
 * Core class
 */
export default class AppCore {

  constructor(createController, appUiEl, appCanvasEl) {

    this.appUiEl = appUiEl;
    this.appCanvasEl = appCanvasEl;

    this.webGLCore = null;
    this.rootElement = null;

    this.mainTask = motion.task({
      onUpdate: this.update.bind(this),
      onRender: this.render.bind(this),
      onStart: () => {
        console.log(`start !`);
        console.log(window.__START_TIME);
      }
    });
    this.controller = createController(this);

    WindowResizeSingleton.getInstance().add((width, height) => {
      this.controller.getSignal(`app.setSize`)({ width, height });
    });

    this.assetsManager = new AssetsManager(this.controller);

    // start
    this.mainTask.start();
    
    this.assetsManager.boot();
  }

  bootUI(rootElement) {
    this.rootElement = rootElement;
    ReactDOM.render(
      React.createElement(
        Container,
        {
          controller: this.controller
        },
        this.rootElement
      ),
      this.appUiEl
    );
  }

  bootWebgl(WebGLCore) {
    this.webGLCore = new WebGLCore(this.appCanvasEl, this.store);
  }

  update(task, time, dt) {
    // this.updateAssetsManager();
    // this.updateWebGL(time, dt);
  }

  render(task, time, dt) {
    if (!this.webGLCore) {
      return;
    }
    this.webGLCore.render(time, dt);
  }

  // updateAssetsManager() {
  //   this.assetsManager.update();
  // }

  updateWebGL(time, dt) {
    if (!this.webGLCore) {
      return;
    }
    this.webGLCore.update(time, dt);
  }

}
