import { ConnectFunction, ConnectMethod } from '~/core';
import { Worlds } from '~/types';
import { lvl1AssetsReady } from '~/computed';

const KEYS_MAP = {
  83: `down`,
  40: `down`,
  90: `up`,
  38: `up`,
  37: `left`,
  81: `left`,
  39: `right`,
  68: `right`
};

export class KeyboardManager {

  constructor(controller) {
    this.controller = controller;
  }

  boot() {
    this.bind();
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
    const setKeyStatus = this.controller.getSignal(`keyboard.setKeyStatus`);
    if (KEYS_MAP[e.keyCode] !== undefined) {
      setKeyStatus({
        keyName: KEYS_MAP[e.keyCode],
        keyState: isDown
      });
    }
  }

}
