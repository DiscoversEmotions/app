import React from 'react';
import ReactDOM from 'react-dom';
import * as motion from 'popmotion';
import { WindowResizeSingleton, ConnectFunction } from '~/core';
import { AssetsManager, WorldsManager, SystemManager, KeyboardManager } from '~/managers';
import { Container } from 'cerebral/react';
import { Provider } from 'react-tunnel';

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
        // console.log(window.__START_TIME);
      }
    });
    this.controller = createController(this);

    WindowResizeSingleton.getInstance().add((width, height) => {
      this.controller.getSignal(`app.setSize`)({ width, height });
    });

    this.assetsManager = new AssetsManager(this.controller);
    this.worldsManager = new WorldsManager(this.controller);
    this.systemManager = new SystemManager(this.controller);
    this.keyboardManager = new KeyboardManager(this.controller);

    // start
    this.mainTask.start();

    this.assetsManager.boot();
    this.worldsManager.boot();
    this.systemManager.boot();
    this.keyboardManager.boot();
  }

  bootUI(rootElement) {
    this.rootElement = rootElement;
    const enhancedRootElement = React.createElement(
      Container,
      {
        controller: this.controller
      },
      React.createElement(
        Provider,
        {
          provide: {
            core: this
          }
        },
        () => this.rootElement
      )
    );
    ReactDOM.render(
      enhancedRootElement,
      this.appUiEl
    );
  }

  bootWebgl(WebGLCore) {
    this.webGLCore = new WebGLCore(this, this.appCanvasEl, this.controller);
    this.controller.getSignal(`app.webglReady`)();
  }

  update(task, time, dt) {
    this.updateWebGL(time, dt);
  }

  render(task, time, dt) {
    if (this.webGLCore) {
      this.webGLCore.render(time, dt);
    }
  }

  updateWebGL(time, dt) {
    if (this.webGLCore) {
      this.webGLCore.update(time, dt);
    }
  }

}
