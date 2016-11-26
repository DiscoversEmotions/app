import { ConnectFunction, ConnectMethod } from '~/core';
import { Worlds } from '~/types';
import { lvl1AssetsReady } from '~/computed';

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
      lvl1AssetsReady: lvl1AssetsReady
    },
    {
      transitionToWorld: `app.transitionToWorld`
    }
  )
  update({ currentWorld, nextWorld, webglReady, lvl1AssetsReady, transitionToWorld }) {
    console.log(`update world ${nextWorld}`);
    if (nextWorld !== `none`) {
      return;
    }
    if (currentWorld === Worlds.Black && webglReady === true) {
      transitionToWorld({ world: Worlds.Room });
    }
    if (currentWorld === Worlds.Room && webglReady && webglReady) {
      transitionToWorld({ world: Worlds.Mind });
    }
    console.log(`render worldsManager`);
  }

}
