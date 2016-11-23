import { ConnectFunction } from '~/core';
import {  } from '~/types';
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
    };
  }

  render({ assets, requested, queued, next, requestAsset }) {
    console.log(`render worldsManager`);
  }

}
