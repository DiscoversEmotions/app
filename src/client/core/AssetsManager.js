import {
  AssetTypes,
  AssetStatus
} from '~/types';
import {
  TextureLoader
} from 'three';

export class AssetsManager {

  constructor() {
    this.started = false;

    this.lastAssetState = null;
  }

  update() {
    const assetState = this.store.state.get(`assets`);
    if (this.lastAssetState === assetState) {
      return;
    }
    console.log(`Update AssetsManager`);
    console.log(assetState.toJS());
    const requested = this.store.selectors.assets.requestedAssetsSelector();
    const queued = this.store.selectors.assets.queuedAssetsSelector();
    if (requested.size <= 4 && queued.size > 0) {
      const nextRequested = this.store.selectors.assets.nextRequestedSelector();
      console.log(`Set requested ${nextRequested.get(`key`)}`);
      console.log(nextRequested.toJS());
      this.store.actions.asset.setAssetRequested(nextRequested.get(`key`));
    }
    // if (!assetState.has(`world_1`)) {
    //   this.store.actions.asset.setAssetRequested(`world_1`);
    // }

    this.lastAssetState = assetState;
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
