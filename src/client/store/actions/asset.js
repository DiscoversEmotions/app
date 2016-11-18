import { fromJS } from 'immutable';
import { AssetStatus } from '~/types';

export function setAssetRequested (assetKey) {
  return (state) => {
    return state
    .update(`assets`, (assets) => {
      return assets.update(assetKey, asset => {
        return asset.set(`status`, AssetStatus.Requested);
      });
    });
  };
}
