import {
  state,
  set,
  push,
  input,
  wait
} from 'cerebral/operators';
import { KEYS_MAP } from '~/managers/KeyboardManager';
import _ from 'lodash';

export default {
  state: {
    keys: _(KEYS_MAP).mapKeys((val) => val).mapValues(() => false)
  },
  signals: {
    setKeyStatus: [
      set(state`keyboard.keys.${input`keyName`}`, input`keyState`)
    ],
    simulateKey: [
      set(state`keyboard.keys.${input`keyName`}`, true),
      wait(50),
      set(state`keyboard.keys.${input`keyName`}`, true)
    ]
  }
};
