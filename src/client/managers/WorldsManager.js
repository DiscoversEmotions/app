import { ConnectFunction } from '~/core';
import { Worlds } from '~/types';
import {  } from '~/computed';

export class WorldsManager {

  constructor(controller) {
    this.controller = controller;
    this.updater = ConnectFunction(
      this.controller,
      this.mapState.bind(this),
      this.mapSignals.bind(this)
    )(
      this.render.bind(this)
    );
  }

  boot() {
    this.updater.update({});
  }

  mapState(props) {
    return {
      currentWorld: `app.world`,
      webglReady: `app.webglReady`
    };
  }

  mapSignals(props) {
    return {
      transitionToWorld: `app.transitionToWorld`
    };
  }

  render({ currentWorld, webglReady, transitionToWorld }) {
    if (currentWorld === Worlds.Black && webglReady === true) {
      transitionToWorld({ world: Worlds.Room });
    }
    console.log(`render worldsManager`);
  }

}
