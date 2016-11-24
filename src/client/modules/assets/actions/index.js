
export function loadAsset ({ input, path, core, controller }) {
  const asset = input.asset;
  const setAssetProgress = controller.getSignal(`assets.setAssetProgress`);
  const loader = core.assetsManager.getLoader(asset);
  return new Promise((resolve, reject) => {
    loader.load(
      asset.fileUrl,
      (ressource) => {
        core.assetsManager.setAsset(asset.key, ressource);
        resolve(ressource);
      },
      (request) => setAssetProgress({ asset }),
      (err) => reject()
    );
  })
  .then(ressource => path.success({}))
  .catch(err => path.error({ err }));
}

export function setAssetProgress ({ input, path, core }) {
  // TODO: use progress !
}
