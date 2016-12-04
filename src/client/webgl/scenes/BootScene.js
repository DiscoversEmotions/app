import { Scene } from './Scene';

export class BootScene extends Scene {

  constructor(...args) {
    super(...args);

    this.scene.add(this.cameraman);
  }

  getEnvConfig() {
    return {
      fogColor: null
    };
  }

  update(time, dt) {}

  mount() {}

  unmount() {}

}
