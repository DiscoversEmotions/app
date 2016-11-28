import { ConnectFunction, ConnectMethod } from '~/core';
import { Worlds } from '~/types';
import { lvl1AssetsReady, memory1AssetsReady } from '~/computed';

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
      nextWorld: `app.nextWorld`,
      webglReady: `app.webglReady`,
      worldTransition: `app.worldTransition`,
      lvl1AssetsReady: lvl1AssetsReady,
      memory1AssetsReady: memory1AssetsReady
    },
    {
      transitionToWorld: `app.transitionToWorld`
    }
  )
  update({ currentWorld, nextWorld, worldTransition, webglReady, lvl1AssetsReady, transitionToWorld, memory1AssetsReady }) {
    if (worldTransition) {
      return;
    }
    if (currentWorld !== Worlds.Memory && memory1AssetsReady === true) {
      transitionToWorld({ world: Worlds.Memory });
    }
    // if (currentWorld === Worlds.Black && webglReady === true) {
    //   transitionToWorld({ world: Worlds.Room });
    // }
    // if (currentWorld === Worlds.Room && webglReady && webglReady) {
    //   transitionToWorld({ world: Worlds.Mind });
    // }
  }

}
