import { state, set, debounce, when, wait, merge, input } from 'cerebral/operators';
import { Scenes, Steps } from '~/types';
import { getDuration, setNextStep, reboot } from './actions';

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
      current: Scenes.Boot,
      next: Scenes.None,
      transition: false
    },
    pointerLock: false,
    step: Steps.Boot,
    level: 1
  },
  signals: {
    setNextStep: [ setNextStep ],
    setStep: [ set(state`app.step`, input`step`) ],
    setSize: [ merge(state`app.size`, { width: input`width`, height: input`height` }) ],
    setBundleReady: [ set(state`app.bundlesReady.${input`bundle`}`, true) ],
    transitionToScene: [
      set(state`app.scene.next`, input`scene`),
      set(state`app.scene.transition`, true),
      wait(500),
      set(state`app.scene.current`, input`scene`),
      set(state`app.scene.next`, `none`),
      wait(500),
      set(state`app.scene.transition`, false)
    ],
    startPointerLock: [ set(state`app.pointerLock`, true) ],
    stopPointerLock: [ set(state`app.pointerLock`, false) ],
    reboot: [ reboot ]
  }
};
