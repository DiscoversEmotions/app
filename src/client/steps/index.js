import BootStep from './BootStep';
import NeedRecoveryStep from './NeedRecoveryStep';

export default {
  boot: new BootStep(),
  needRecovery: new NeedRecoveryStep()
};
