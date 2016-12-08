import { ConnectMethod } from '~/core';
import { waitForKeyPress } from '~/computed';

export const KEYS_MAP = {
  83: `s`,
  40: `down`,
  90: `z`,
  38: `up`,
  37: `left`,
  81: `q`,
  39: `right`,
  68: `d`,
  32: `space`,
  13: `enter`,
  89: `y`,
  78: `n`,
  75: `k`
};

export class KeyboardManager {

  constructor(controller, appCore) {
    this.controller = controller;
    this.appCore = appCore;
  }

  boot() {
    this.bind();
    // this.update({}, this.controller, this);
  }

  bind() {
    document.addEventListener(`keydown`, (e) => {
      this.handleKey(e, true);
    });
    document.addEventListener(`keyup`, (e) => {
      this.handleKey(e, false);
    });
  }

  handleKey(e, isDown) {
    // console.log(e.keyCode);
    const setKeyStatus = this.controller.getSignal(`keyboard.setKeyStatus`);
    if (KEYS_MAP[e.keyCode] !== undefined) {
      setKeyStatus({
        keyName: KEYS_MAP[e.keyCode],
        keyState: isDown
      });
    }
    if (KEYS_MAP[e.keyCode] === `enter`) {
      this.appCore.pointerLock.tryActivate();
    }
  }

}
