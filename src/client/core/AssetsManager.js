export class AssetsManager {

  constructor(store) {
    this.store = store;
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
      const nextRequested = queued.valueSeq().first();
      console.log(`Set requested`);
      console.log(nextRequested.toJS());
      this.store.actions.asset.setAssetRequested(nextRequested.get(`key`));
    }
    // if (!assetState.has(`world_1`)) {
    //   this.store.actions.asset.setAssetRequested(`world_1`);
    // }

    this.lastAssetState = assetState;
  }

}
