import { ConnectMethod } from '~/core';
import { canStartRoom, mind1AssetsReady, lastMessage } from '~/computed';
import { Scenes, Steps } from '~/types';

export class ScenesManager {

  constructor(controller) {
    this.controller = controller;
  }

  boot() {
    this.update({}, this.controller, this);
  }

  @ConnectMethod(
    {
      currentScene: `app.scene.current`,
      sceneTransition: `app.scene.transition`,
      step: `app.step`,
      canStartRoom: canStartRoom,
      mind1AssetsReady: mind1AssetsReady,
      lastMessage: lastMessage
    },
    {
      transitionToScene: `app.transitionToScene`
    }
  )
  update({
    currentScene, sceneTransition, canStartRoom, transitionToScene,
    mind1AssetsReady, lastMessage, step
  }) {
    if (sceneTransition) {
      return;
    }
    if (currentScene === Scenes.Black && canStartRoom) {
      transitionToScene({ scene: Scenes.Room });
    }
    if (currentScene === Scenes.Room && step === Steps.Emotion1) {
      transitionToScene({ scene: Scenes.Lvl1 });
    }
    if (currentScene === Scenes.Lvl1 && lastMessage.key === `linked-memory`) {
      transitionToScene({ scene: Scenes.Memory1 });
    }

    // DEV
    // if (currentScene !== Scenes.Lvl1 && mind1AssetsReady) {
    //   transitionToScene({ scene: Scenes.Lvl1 });
    // }
  }

}
