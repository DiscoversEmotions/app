import { SkinnedMesh, AnimationMixer } from 'three';

export class BlendCharacter extends SkinnedMesh {

  constructor (loadedObject) {

    var skinnedMesh = null;

    // The exporter does not currently allow exporting a skinned mesh by itself
    // so we must fish it out of the hierarchy it is embedded in (scene)
    loadedObject.traverse((item) => {
      if ( item instanceof SkinnedMesh ) {
        skinnedMesh = item;
      }
    });

    super(skinnedMesh.geometry, skinnedMesh.material);

    this.weightSchedule = [];
  	this.warpSchedule = [];
    this.skinnedMesh = skinnedMesh;

    if ( this.skinnedMesh === null ) {
      // If we didn't successfully find the mesh, bail out
      console.error(`BlendCharacter error :/`);
      return;
    }

    this.material.skinning = true;

    this.mixer = new AnimationMixer(this);
    this.mixer = this.mixer;

    // Create the animations
    for ( var i = 0; i < this.geometry.animations.length; ++ i ) {
      this.mixer.clipAction( this.geometry.animations[ i ] );
    }

  }

  setMaterial(mat) {
    this.material = mat;
    this.material.skinning = true;
  }

  update(dt) {
    this.mixer.update(dt);
  }

  play( animName, weight ) {
    return this.mixer.clipAction( animName ).setEffectiveWeight( weight ).play();
  }

  crossfade( fromAnimName, toAnimName, duration ) {
    this.mixer.stopAllAction();
    var fromAction = this.play( fromAnimName, 1 );
    var toAction = this.play( toAnimName, 1 );
    fromAction.crossFadeTo( toAction, duration, false );
  }

  warp( fromAnimName, toAnimName, duration ) {
    this.mixer.stopAllAction();
    var fromAction = this.play( fromAnimName, 1 );
    var toAction = this.play( toAnimName, 1 );
    fromAction.crossFadeTo( toAction, duration, true );
  }

  applyWeight( animName, weight ) {
    this.mixer.clipAction( animName ).setEffectiveWeight( weight );
  }

  getWeight( animName ) {
    return this.mixer.clipAction( animName ).getEffectiveWeight();
  }

  pauseAll() {
    this.mixer.timeScale = 0;
  }

  unPauseAll() {
    this.mixer.timeScale = 1;
  }

  stopAll() {
    this.mixer.stopAllAction();
  }

  showModel( boolean ) {
    this.visible = boolean;
  }
}
