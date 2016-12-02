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
      recoveryProgress: `app.recoveryProgress`,
      canStartRoom: canStartRoom,
      mind1AssetsReady: mind1AssetsReady
    },
    {
      transitionToScene: `app.transitionToScene`
    }
  )
  update({
    currentSceneName, nextSceneName, sceneTransition, canStartRoom, transitionToScene,
    recoveryStarted, mind1AssetsReady, recoveryProgress
  }) {
    if (sceneTransition) {
      return;
    }
    if (currentSceneName === Scenes.Black && canStartRoom) {
      transitionToScene({ scene: Scenes.Room });
    }
    if (currentSceneName === Scenes.Room && recoveryStarted && recoveryProgress.lvl1 === false) {
      transitionToScene({ scene: Scenes.Lvl1 });
    }
    if (currentSceneName === Scenes.Lvl1 && recoveryProgress.lvl1 === true) {
      transitionToScene({ scene: Scenes.Memory1 });
    }

    // DEV
    // if (currentSceneName !== Scenes.Lvl1 && mind1AssetsReady) {
    //   transitionToScene({ scene: Scenes.Lvl1 });
    // }
  }

}
