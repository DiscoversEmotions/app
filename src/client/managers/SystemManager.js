import { ConnectFunction, ConnectMethod } from '~/core';
import { Worlds } from '~/types';
import { lvl1AssetsReady } from '~/computed';

export class SystemManager {

  constructor(controller) {
    this.controller = controller;
  }

  boot() {
    this.update({}, this.controller, this);
  }

  @ConnectMethod(
    {

    },
    {

    }
  )
  update({  }) {

  }

}
