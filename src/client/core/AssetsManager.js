export class AssetsManager {

  constructor(store) {
    this.store = store;
    this.started = false;

    this.lastAssetState = null;
  }

  update() {
    const assetState = this.store.state.get(`assets`);
    if (this.lastAssetState !== assetState) {
      console.log(`Update AssetsManager`);
      if (!assetState.has(`world_1`)) {
        this.store.dispatch(this.store.actions.asset.setAssetRequested(`world_1`));
      }


      this.lastAssetState = assetState;
    }
  }

}
