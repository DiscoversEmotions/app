import { wait, set, state, input } from 'cerebral/operators';
import { loadAsset } from '../actions';
import { AssetStatus } from '~/types';

export default {
  requestAsset: [
    [
      set(state`assets.${input`asset.key`}.status`, AssetStatus.Requested),
      loadAsset, {
        load: [() => { console.log(`load`); }],
        progress: [() => { console.log(`progress`); }],
        error: [() => { console.log(`error`); }]
      }
    ]
  ]
};
