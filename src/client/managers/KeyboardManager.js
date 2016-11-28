import { ConnectFunction, ConnectMethod } from '~/core';
import { Worlds } from '~/types';
import { lvl1AssetsReady } from '~/computed';

export class KeyboardManager {

  constructor(controller) {
    this.controller = controller;
  }

  boot() {
    this.update({}, this.controller, this);
    this.bind({}, this.controller, this);
  }

  @ConnectMethod(
    {

    },
    {
    }
  )
  update({}) {

  }

  @ConnectMethod(
    {},
    {
      
    }
  )
  bind({}) {

  }

}
