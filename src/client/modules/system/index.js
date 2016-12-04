import {
  state,
  set,
  push,
  input,
  wait
} from 'cerebral/operators';
import { pushMessageAndWait, updateLastMessage } from './actions';

export default {
  state: {
    messages: window.__MESSAGES,
    readyForNextMessage: true
  },
  signals: {
    pushMessageAndWait: [ pushMessageAndWait ],
    updateLastMessage: [ updateLastMessage ]
  }
};
