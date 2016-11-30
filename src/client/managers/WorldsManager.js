import { ConnectFunction, ConnectMethod } from '~/core';
import { Worlds } from '~/types';
import { canStartRoom, memory1AssetsReady } from '~/computed';

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
      connectedToEyes: `app.connectedToEyes`,
      recoveryStarted: `app.recoveryStarted`,
      canStartRoom: canStartRoom
    },
    {
      transitionToWorld: `app.transitionToWorld`
    }
  )
  update({
    currentWorld, nextWorld, worldTransition, webglReady, canStartRoom, transitionToWorld,
    connectedToEyes, recoveryStarted
  }) {
    if (worldTransition) {
      return;
    }
    if (currentWorld === Worlds.Black && canStartRoom) {
      transitionToWorld({ world: Worlds.Room });
    }
    if (currentWorld === Worlds.Room && recoveryStarted) {
      transitionToWorld({ world: Worlds.Mind });
    }
    // if (currentWorld === Worlds.Black && webglReady === true) {
    //   transitionToWorld({ world: Worlds.Room });
    // }
    // if (currentWorld === Worlds.Room && webglReady) {
    //   transitionToWorld({ world: Worlds.Mind });
    // }
  }

}
