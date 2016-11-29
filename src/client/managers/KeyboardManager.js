import { ConnectFunction, ConnectMethod } from '~/core';
import { Worlds } from '~/types';
import { lvl1AssetsReady } from '~/computed';

const KEYS_MAP = {
  83: `s`,
  40: `down`,
  90: `z`,
  38: `up`,
  37: `left`,
  81: `q`,
  39: `right`,
  68: `d`
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
