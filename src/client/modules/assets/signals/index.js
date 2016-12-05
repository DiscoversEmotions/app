import { wait, set, state, input } from 'cerebral/operators';
import { loadAsset, setAssetProgress } from '../actions';
import { AssetStatus } from '~/types';

export default {
  requestAsset: [
    [
      set(state`assets.${input`asset.key`}.status`, AssetStatus.Requested),
      loadAsset, {
        success: [
          set(state`assets.${input`asset.key`}.status`, AssetStatus.Ready)
        ],
        error: [() => { console.error(`Fail to load asset`); }]
      }
    ]
  ],
  setAssetProgress: [
    setAssetProgress
  ]
};
