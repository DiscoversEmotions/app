import { state, set, debounce, when, wait, merge, input } from 'cerebral/operators';
import { Scenes, Steps } from '~/types';
import { getDuration } from './actions';

export default {
  state: {
    size: {
      width: 600,
      height: 600
    },
    bundlesReady: {
      webgl: false
    },
    scene: {
      current: Scenes.Black,
      next: Scenes.None,
      prev: Scenes.None,
      transition: false
    },
    pointerLock: false,
    step: Steps.Boot
  },
  signals: {
    setStep: [ set(state`app.step`, input`step`) ],
    setSize: [ merge(state`app.size`, { width: input`width`, height: input`height` }) ],
    setBundleReady: [ set(state`app.bundlesReady.${input`bundle`}`, true) ],
    transitionToScene: [
      set(state`app.scene.next`, input`scene`),
      set(state`app.scene.transition`, true),
      [
        wait(500),
        set(state`app.scene.prev`, state`app.scene.current`),
        set(state`app.scene.current`, input`scene`),
        set(state`app.scene.next`, `none`)
      ],
      [
        wait(1000),
        set(state`app.scene.transition`, false)
      ]
    ],
    startPointerLock: [ set(state`app.pointerLock`, true) ],
    stopPointerLock: [ set(state`app.pointerLock`, false) ]
  }
};
