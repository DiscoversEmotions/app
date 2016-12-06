import { ConnectMethod } from '~/core';
import { canStartRoom, mind1AssetsReady, lastMessage, expectedScene } from '~/computed';
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
      sceneTransition: `app.scene.transition`,
      currentScene: `app.scene.current`,
      expectedScene: expectedScene
    },
    {
      transitionToScene: `app.transitionToScene`
    }
  )
  update({ sceneTransition, currentScene, expectedScene, transitionToScene }) {
    if (sceneTransition) {
      return;
    }
    if (currentScene !== expectedScene) {
      transitionToScene({ scene: expectedScene });
    }
  }

}
