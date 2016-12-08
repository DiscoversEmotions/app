import React from 'react';
import ReactDOM from 'react-dom';
import DOMEvents from 'dom-events';
import debounce from 'lodash/debounce';
import * as motion from 'popmotion';
import { ConnectMethod, PointerLock } from '~/core';
import { AssetsManager, ScenesManager, SystemManager, KeyboardManager, SoundManager } from '~/managers';
import { Container } from 'cerebral/react';
import { Provider } from 'react-tunnel';
import { shouldBePointerLocked } from '~/computed';


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
    this.shouldBePointerLocked = false;
    this.mainTask = null;

    // Controller
    this.controller = createController(this);

    // Managers
    this.assetsManager = new AssetsManager(this.controller);
    this.scenesManager = new ScenesManager(this.controller);
    this.systemManager = new SystemManager(this.controller);
    this.keyboardManager = new KeyboardManager(this.controller, this);
    this.soundManager = new SoundManager(this.controller, this.assetsManager);

    // Boot Managers
    this.assetsManager.boot();
    this.scenesManager.boot();
    this.systemManager.boot();
    this.keyboardManager.boot();
    this.soundManager.boot();

    // PointerLock
    this.initPointerLock();

    // Resize
    this.initResize();

    // State Update
    this.stateUpdate({}, this.controller, this);

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
    // DOMEvents.on(document.body, `click`, () => {
    //   if (this.shouldBePointerLocked) {
    //     this.pointerLock.tryActivate();
    //   }
    // });
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
    this.controller.getSignal(`app.setBundleReady`)({ bundle: `webgl` });
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

  @ConnectMethod(
    {
      shouldBePointerLocked: shouldBePointerLocked
    }
  )
  stateUpdate({ shouldBePointerLocked }) {
    this.shouldBePointerLocked = shouldBePointerLocked;
  }

}
