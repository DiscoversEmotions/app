import {
  state,
  set,
  push,
  input
} from 'cerebral/operators';
import { planNextMessage } from './actions';

export default {
  state: {
    messages: window.__MESSAGES
  },
  signals: {
    pushMessage: [
      push(state`system.messages`, input`message`)
    ],
    planNextMessage: [
      planNextMessage
    ]
  }
};
