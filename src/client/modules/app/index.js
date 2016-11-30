import { state, set, debounce, when, wait, merge, input } from 'cerebral/operators';
import { Worlds } from '~/types';
import { getDuration } from './actions';

export default {
  state: {
    size: {
      width: 600,
      height: 600
    },
    world: Worlds.Black,
    nextWorld: `none`,
    prevWorld: `none`,
    webglReady: false,
    worldTransition: false,
    connectedToEyes: false,
    recoveryStarted: false,
    pointerLock: false
  },
  signals: {
    setSize: [ merge(state`app.size`, { width: input`width`, height: input`height` }) ],
    webglReady: [ set(state`app.webglReady`, true) ],
    setCurrentWorld: [ set(state`app.world`, input`world`) ],
    transitionToWorld: [
      set(state`app.nextWorld`, input`world`),
      set(state`app.worldTransition`, true),
      [
        wait(500),
        set(state`app.prevWorld`, state`app.world`),
        set(state`app.world`, input`world`),
        set(state`app.nextWorld`, `none`)
      ],
      [
        wait(1000),
        set(state`app.worldTransition`, false)
      ]
    ],
    startRecovery: [ set(state`app.recoveryStarted`, true) ],
    startPointerLock: [ set(state`app.pointerLock`, true) ],
    stopPointerLock: [ set(state`app.pointerLock`, false) ]
  }
};
