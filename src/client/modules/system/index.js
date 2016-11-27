import {
  state,
  set,
  push,
  input
} from 'cerebral/operators';

export default {
  state: {
    messages: window.__MESSAGES
  },
  signals: {
    pushMessage: [
      push(state`system.messages`, input`message`)
    ]
  }
};
