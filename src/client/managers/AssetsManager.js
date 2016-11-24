import { AssetTypes, AssetStatus } from '~/types';
import { TextureLoader, ObjectLoader } from 'three';
import { ConnectFunction } from '~/core';
import { requestedAssets, queuedAssets, nextRequestedAsset } from '~/computed';

export class AssetsManager {

  constructor(controller) {
    this.controller = controller;
    this.assetsData = {};
    this.updater = ConnectFunction(
      this.controller,
      this.mapState.bind(this),
      this.mapSignals.bind(this)
    )(
      this.render.bind(this)
    );
  }

  boot() {
    this.updater.update({});
  }

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

  render({ assets, requested, queued, next, requestAsset }) {
    if (requested.length <= 1 && queued.length > 0 && next !== null) {
      requestAsset({ asset: next });
    }
  }

  getLoader(asset) {
    switch(asset.type) {
    case AssetTypes.Texture:
      return new TextureLoader(this);
    // case AssetTypes.Obj:
    //   return new OBJLoader(this);
    case AssetTypes.Json:
      return new ObjectLoader(this);
    default:
      throw new Error(`Can't find loader for asset of type "${asset.type}"`);
    }
  }

  setAsset(key, ressource) {
    if (this.assetsData[key] !== undefined) {
      throw new Error(`Asset '${key}' already exist !`);
    }
    this.assetsData[key] = ressource;
  }

  /**
   * LoadingManager Methods
   */

  itemStart(url, args) {
    // console.log(`itemStart : ${url}`);
  };

  itemEnd(url) {
    // console.log(`itemEnd : ${url}`);
  };

  itemError(url) {
    // console.error(`Ooops :/`);
  };

}
