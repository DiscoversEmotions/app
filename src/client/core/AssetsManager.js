import {
  AssetTypes,
  AssetStatus
} from '~/types';
import {
  TextureLoader
} from 'three';
import { ConnectFunction } from '~/core';
import { requestedAssets, queuedAssets, nextRequestedAsset } from '~/computed';

export class AssetsManager {

  mapState(props) {
    return {
      assets: `assets`,
      requested: requestedAssets,
      queued: queuedAssets,
      next: nextRequestedAsset
    };
  }

  mapSignals(props) {
    return {
      requestAsset: `assets.requestAsset`
    };
  }

  constructor(controller) {
    this.controller = controller;
    this.updater = ConnectFunction(
      this.controller,
      this.mapState.bind(this),
      this.mapSignals.bind(this)
    )(
      this.update.bind(this)
    );
    this.updater.update({});
  }

  update({ assets, requested, queued, next, requestAsset }) {
    if (requested.length <= 4 && queued.length > 0 && next !== null) {
      console.log(`Set requested ${next.key}`);
      requestAsset({ asset: next });
    }
  }

  getLoader(type) {
    switch( type ) {
    case AssetTypes.Texture:
      return new TextureLoader(this);
    default:
      throw new Error(`Can't find loader for asset of type ${type}`);
    }
  }

  /**
   * LoadingManager Methods
   */

  itemStart(url) {

  };

  itemEnd(url) {

  };

  itemError(url) {
    console.error(`Ooops :/`);
  };

}
