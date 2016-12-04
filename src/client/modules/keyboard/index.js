import {
  state,
  set,
  push,
  input
} from 'cerebral/operators';
import { KEYS_MAP } from '~/managers/KeyboardManager';
import _ from 'lodash';

// console.log(_.mapKeys(KEYS_MAP, (val, key) => {
//   return val;
// }))

export default {
  state: {
    keys: _(KEYS_MAP).mapKeys((val) => val).mapValues(() => false)
    // {
    //   left: false,
    //   right: false,
    //   up: false,
    //   down: false,
    //   z: false,
    //   s: false,
    //   q: false,
    //   d: false
    // }
  },
  signals: {
    setKeyStatus: [
      set(state`keyboard.keys.${input`keyName`}`, input`keyState`)
    ]
  }
};
