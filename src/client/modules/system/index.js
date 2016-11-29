import {
  state,
  set,
  push,
  input,
  wait
} from 'cerebral/operators';
import { planNextMessage, updateLastMessage } from './actions';

export default {
  state: {
    messages: window.__MESSAGES,
    numberOfLines: 6,
    readyForNextMessage: true,
    bootDone: false,
    findErrorDone: false
  },
  signals: {
    pushMessage: [
      push(state`system.messages`, input`message`)
    ],
    planNextMessage: [
      planNextMessage
    ],
    updateLastMessage: [
      updateLastMessage
    ],
    setBootDone: [
      set(state`system.bootDone`, true)
    ],
    setFindErrorDone: [
      set(state`system.findErrorDone`, true)
    ]
  }
};
