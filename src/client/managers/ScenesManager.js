import { ConnectMethod } from '~/core';
import { canStartRoom, mind1AssetsReady, lastMessage } from '~/computed';
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
      mind1AssetsReady: mind1AssetsReady,
      lastMessage: lastMessage
    },
    {
      transitionToScene: `app.transitionToScene`
    }
  )
  update({
    currentSceneName, nextSceneName, sceneTransition, canStartRoom, transitionToScene,
    recoveryStarted, mind1AssetsReady, recoveryProgress, lastMessage
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
    if (currentSceneName === Scenes.Lvl1 && lastMessage.key === `linked-memory`) {
      transitionToScene({ scene: Scenes.Memory1 });
    }

    // DEV
    // if (currentSceneName !== Scenes.Lvl1 && mind1AssetsReady) {
    //   transitionToScene({ scene: Scenes.Lvl1 });
    // }
  }

}
