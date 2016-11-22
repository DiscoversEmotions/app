import { wait, set, state, input } from 'cerebral/operators';
import { yoloAction } from '../actions';
import { AssetStatus } from '~/types';

export default {
  doTheYolo: [
    ...wait(1000, [
      yoloAction
    ])
  ],
  requestAsset: [
    [
      set(state`assets.${input`asset.key`}.status`, AssetStatus.Requested),
      yoloAction
    ]
  ]
};
