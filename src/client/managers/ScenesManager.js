import { ConnectMethod } from '~/core';
import { canStartRoom, mind1AssetsReady } from '~/computed';
import { Scenes } from '~/types';

export class ScenesManager {

  constructor(controller) {
    this.controller = controller;
  }

  boot() {
    this.update({}, this.controller, this);
  }

  @ConnectMethod(
    {
      currentSceneName: `app.currentSceneName`,
      nextSceneName: `app.nextSceneName`,
      sceneTransition: `app.sceneTransition`,
      recoveryStarted: `app.recoveryStarted`,
      canStartRoom: canStartRoom,
      mind1AssetsReady: mind1AssetsReady
    },
    {
      transitionToScene: `app.transitionToScene`
    }
  )
  update({
    currentSceneName, nextSceneName, sceneTransition, canStartRoom, transitionToScene,
    recoveryStarted, mind1AssetsReady
  }) {
    if (sceneTransition) {
      return;
    }
    if (currentSceneName === Scenes.Black && canStartRoom) {
      transitionToScene({ scene: Scenes.Room });
    }
    if (currentSceneName === Scenes.Room && recoveryStarted) {
      transitionToScene({ scene: Scenes.Mind });
    }

    // DEV
    if (currentSceneName !== Scenes.Mind && mind1AssetsReady) {
      transitionToScene({ scene: Scenes.Mind });
    }
  }

}
