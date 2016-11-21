import { state, set, wait, when, merge, input } from 'cerebral/operators';

export default {
  state: {
    size: {
      width: 600,
      height: 600
    },
    aboutVisible: false
  },
  signals: {
    setSize: [
      merge(state`app.size`, { width: input`width`, height: input`height` })
    ]
  }
};
