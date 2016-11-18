import { createSelector } from 'reselect';
import { Steps, Worlds, AssetStatus } from '~/types';

export const assetStateAccessor = (state) => state.get(`assets`);

export const requestedAssetsSelector = createSelector(
  assetStateAccessor,
  (assets) => {
    return assets.filter((asset) => (asset.get(`status`) === AssetStatus.Requested));
  }
);

export const queuedAssetsSelector = createSelector(
  assetStateAccessor,
  (assets) => {
    return assets.filter((asset) => (asset.get(`status`) === AssetStatus.Queued));
  }
);
