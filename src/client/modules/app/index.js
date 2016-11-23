import { state, set, wait, when, merge, input } from 'cerebral/operators';
import { Worlds } from '~/types';

export default {
  state: {
    size: {
      width: 600,
      height: 600
    },
    world: Worlds.Black,
    webglReady: false
  },
  signals: {
    setSize: [
      merge(state`app.size`, { width: input`width`, height: input`height` })
    ]
  }
};
