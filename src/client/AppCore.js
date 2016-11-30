import React from 'react';
import ReactDOM from 'react-dom';
import DOMEvents from 'dom-events';
import debounce from 'lodash/debounce';
import * as motion from 'popmotion';
import { ConnectFunction, PointerLock } from '~/core';
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

    this.pointerLock = null;
    this.mainTask = null;

    // Controller
    this.controller = createController(this);

    // Managers
    this.assetsManager = new AssetsManager(this.controller);
    this.worldsManager = new WorldsManager(this.controller);
    this.systemManager = new SystemManager(this.controller);
    this.keyboardManager = new KeyboardManager(this.controller);

    // Boot Managers
    this.assetsManager.boot();
    this.worldsManager.boot();
    this.systemManager.boot();
    this.keyboardManager.boot();

    // PointerLock
    this.initPointerLock();

    // Resize
    this.initResize();

    // start
    this.initTask();

    this.mainTask.start();
  }

  initResize() {
    DOMEvents.on(window, `resize`, debounce(this.handleResize.bind(this), 100));
    this.handleResize();
  }

  initPointerLock() {
    this.pointerLock = new PointerLock(
      document.body,
      () => (this.controller.getSignal(`app.startPointerLock`)()),
      () => (this.controller.getSignal(`app.stopPointerLock`)())
    );
  }

  initTask() {
    this.mainTask = motion.task({
      onUpdate: this.update.bind(this),
      onRender: this.render.bind(this)
    });
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

  handleResize() {
    this.controller.getSignal(`app.setSize`)({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

}
