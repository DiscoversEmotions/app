import {
  TextureLoader
} from 'three';

function getLoader (asset) {
  switch( asset.type ) {
  case AssetTypes.Texture:
    return new TextureLoader(this);
  default:
    throw new Error(`Can't find loader for asset of type ${type}`);
  }
}

export function yoloAction({ input, path }) {
  const asset = input.asset;
  console.log(asset);
  const loader = getLoader(asset);
  console.log(loader);
};

export function loadAsset ({ input, path }) {
  const asset = input.get(`asset`);


}
