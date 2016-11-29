import {
  state,
  set,
  push,
  input,
  wait
} from 'cerebral/operators';
import { planNextMessage } from './actions';

export default {
  state: {
    messages: window.__MESSAGES,
    numberOfLines: 6,
    readyForNextMessage: true,
    bootDone: false
  },
  signals: {
    pushMessage: [
      push(state`system.messages`, input`message`)
    ],
    planNextMessage: [
      planNextMessage
    ],
    setBootDone: [
      set(state`system.bootDone`, true)
    ]
  }
};
