import BootStep from './BootStep';
import BootStepBis from './BootStepBis';

export default {
  init: {
    update(time, dt) {
      return `boot`;
    }
  },
  boot: new BootStep(),
  boot2: new BootStepBis()
};
