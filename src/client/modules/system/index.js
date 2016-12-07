import {
  state,
  set,
  push,
  input,
  wait
} from 'cerebral/operators';
import { pushMessage, updateLastMessage } from './actions';

export default {
  state: {
    messages: window.__MESSAGES,
    readyForNextMessage: true
  },
  signals: {
    pushMessage: [ pushMessage ],
    updateLastMessage: [ updateLastMessage ]
  }
};
