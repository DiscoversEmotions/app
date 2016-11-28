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
      down: false
    }
  },
  signals: {
    setKeyStatus: [
      set(state`keyboard.keys.${input`keyName`}`, input`keyState`)
    ]
  }
};
