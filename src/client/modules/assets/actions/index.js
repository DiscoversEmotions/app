
export function loadAsset ({ input, path, core }) {
  const asset = input.asset;
  const loader = core.assetsManager.getLoader(asset);
  return new Promise(function(resolve, reject) {
    loader.load(
      asset.fileUrl,
      (ressource) => path.load({ ressource }),
      (request) => path.progress(),
      (err) => path.error()
    );
    // setTimeout(function () {
    //   resolve(path.progress());
    // }, 3000);
  });
}
