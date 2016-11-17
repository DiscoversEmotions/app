import { fromJS } from 'immutable';
import { AssetStatus } from '~/types';

export function setAssetRequested (assetName) {
  return (state) => {
    return state
    .update(`assets`, (assets) => {
      if (!assets.has(`assetName`)) {
        var assets = assets.set(assetName, fromJS({
          status: AssetStatus.Requested
        }));
      }
      return assets;
    });
  };
}
