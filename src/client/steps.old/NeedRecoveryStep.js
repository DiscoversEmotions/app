import { world, step } from '~/store/actions';

export default class NeedRecoveryStep {

  constructor() {

  }

  start(stateManager, time, dt) {
    stateManager.dispatch(step.setData(
      `needRecovery`,
      {}
    ));
  }

  update(stateManager, time, dt) {

  }

  stop(stateManager, time, dt) {

  }

}
