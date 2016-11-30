import { state, set, debounce, when, wait, merge, input } from 'cerebral/operators';
import { Scenes } from '~/types';
import { getDuration } from './actions';

export default {
  state: {
    size: {
      width: 600,
      height: 600
    },
    currentSceneName: Scenes.Black,
    nextSceneName: Scenes.None,
    prevSceneName: Scenes.None,
    webglReady: false,
    sceneTransition: false,
    connectedToEyes: false,
    recoveryStarted: false,
    pointerLock: false
  },
  signals: {
    setSize: [ merge(state`app.size`, { width: input`width`, height: input`height` }) ],
    webglReady: [ set(state`app.webglReady`, true) ],
    transitionToScene: [
      set(state`app.nextSceneName`, input`scene`),
      set(state`app.sceneTransition`, true),
      [
        wait(500),
        set(state`app.prevSceneName`, state`app.currentSceneName`),
        set(state`app.currentSceneName`, input`scene`),
        set(state`app.nextSceneName`, `none`)
      ],
      [
        wait(1000),
        set(state`app.sceneTransition`, false)
      ]
    ],
    startRecovery: [ set(state`app.recoveryStarted`, true) ],
    startPointerLock: [ set(state`app.pointerLock`, true) ],
    stopPointerLock: [ set(state`app.pointerLock`, false) ]
  }
};
