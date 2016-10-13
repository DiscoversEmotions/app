import { PostProcessing as CorePostProcessing, GUISingleton } from '~/core';
import BoxBlurPass from 'wagner/src/passes/box-blur/BoxBlurPass';
import MultiPassBloomPass from 'wagner/src/passes/bloom/MultiPassBloomPass';
import BrightnessContrastPass from 'wagner/src/passes/brightness-contrast/BrightnessContrastPass';
import DOFPass from 'wagner/src/passes/dof/DOFPass';
import FXAAPass from 'wagner/src/passes/fxaa/FXAAPass';
import DepthPass from '~/passes/depth/DepthPass';
import { Vector2 } from 'three';

export class PostProcessing extends CorePostProcessing {

  constructor (rendere) {
    super(rendere);
    this.addGui();
  }

  addGui () {
    GUISingleton.getInstance().add('postProcessing', (panel) => {

    });
  }

  initEffects () {
    return [
      {
        active: true,
        name: 'fxaa',
        pass: new FXAAPass()
      },
      {
        active: false,
        shake: true,
        name: 'boxBlurPass',
        pass: new BoxBlurPass(3, 3)
      },
      {
        active: false,
        name: 'bloom',
        pass: new MultiPassBloomPass()
      },
      {
        active: false,
        name: 'brightness contrast',
        pass: new BrightnessContrastPass(0.13, 1.1)
      },
      {
        active: false,
        name: 'dof',
        pass: new DOFPass({ tBias: 1 })
      },
      {
        active: true,
        name: 'depth',
        pass: new DepthPass({ scene: this.scene, camera: this.camera})
      }
    ];

    const pipeline = new EffectPipeline();
    pipeline.add(new DepthPass({
      name: 'depth'
      inputs: {}
    }));
    pipeline.add(new DofPass({
      name: 'dof'
      inputs: {
        depth: 'depth.main'
      },
      params: {
        yolo: true
      }
    }));


  }

  update (time, dt) {
    if (this.effects[1].active && this.effects[1].shake) {
      var blur = 1 + Math.random() * 4;
      this.effects[1].pass.params.delta = new Vector2(blur, blur);
    }
  }

}
