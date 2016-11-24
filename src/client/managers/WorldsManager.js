import { ConnectFunction, ConnectMethod } from '~/core';
import { Worlds } from '~/types';
import {  } from '~/computed';

export class WorldsManager {

  constructor(controller) {
    this.controller = controller;
  }

  boot() {
    this.update({}, this.controller, this);
  }

  @ConnectMethod(
    {
      currentWorld: `app.world`,
      webglReady: `app.webglReady`
    },
    {
      transitionToWorld: `app.transitionToWorld`
    }
  )
  update({ currentWorld, webglReady, transitionToWorld }) {
    if (currentWorld === Worlds.Black && webglReady === true) {
      transitionToWorld({ world: Worlds.Room });
    }
    console.log(`render worldsManager`);
  }

}
