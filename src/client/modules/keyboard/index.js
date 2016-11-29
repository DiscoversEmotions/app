import {
  state,
  set,
  push,
  input
} from 'cerebral/operators';

export default {
  state: {
    keys: {
      left: false,
      right: false,
      up: false,
      down: false,
      z: false,
      s: false,
      q: false,
      d: false
    }
  },
  signals: {
    setKeyStatus: [
      set(state`keyboard.keys.${input`keyName`}`, input`keyState`)
    ]
  }
};
