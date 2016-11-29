import { AssetTypes, AssetStatus } from '~/types';
import { TextureLoader, ObjectLoader, AudioLoader } from 'three';
import { AWDLoader } from '~/webgl';
import { ConnectMethod } from '~/core';
import { requestedAssets, queuedAssets, nextRequestedAsset } from '~/computed';

export class AssetsManager {

  constructor(controller) {
    this.controller = controller;
    this.assetsData = {};
  }

  boot() {
    this.update({}, this.controller, this);
  }

  @ConnectMethod(
    {
      assets: `assets`,
      requested: requestedAssets,
      queued: queuedAssets,
      next: nextRequestedAsset
    },
    {
      requestAsset: `assets.requestAsset`
    }
  )
  update({ assets, requested, queued, next, requestAsset }) {
    if (requested.length <= 3 && queued.length > 0 && next !== null) {
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
    case AssetTypes.Audio:
      return new AudioLoader(this);
    case AssetTypes.AWD:
      return new AWDLoader(this);
    default:
      throw new Error(`Can't find loader for asset of type "${asset.type}"`);
    }
  }

  setAsset(key, ressource) {
    console.log(ressource);
    if (this.assetsData[key] !== undefined) {
      throw new Error(`Asset '${key}' already exist !`);
    }
    this.assetsData[key] = ressource;
  }

  getAsset(key) {
    const status = this.controller.getState(`assets.${key}.status`);
    console.log(status);
    if (status === AssetStatus.Ready && !_.isNil(this.assetsData[key])) {
      return this.assetsData[key];
    }
    throw new Error(`Can't find asset ${key}`);
    // this.assetsData[key] = ressource;
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
