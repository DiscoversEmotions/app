import { world, step } from '~/actions';

export default class NeedRecoveryStep {

  constructor() {

  }

  start(stateManager, time, dt) {
    stateManager.updateState(step.setData(
      `needRecovery`,
      {}
    ));
  }

  update(stateManager, time, dt) {

  }

  stop(stateManager, time, dt) {

  }

}
