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
      let postProcessingFolder = panel.addFolder({ label: 'PostProcessing' });
      postProcessingFolder.add(this, 'active', { label: 'active' });

      postProcessingFolder.add(this.effects[0], 'active', { label: 'fxaa' });

      postProcessingFolder.add(this.effects[1], 'active', { label: 'blur effect' });
      postProcessingFolder.add(this.effects[1], 'shake', { label: 'blur shake' });

      postProcessingFolder.add(this.effects[2], 'active', { label: 'bloom effect' });
      postProcessingFolder.add(this.effects[2].pass, 'params', { label: 'bloom params' });

      postProcessingFolder.add(this.effects[3], 'active', { label: 'brightness contrast effect' });
      postProcessingFolder.add(this.effects[3].pass.params, 'brightness', { label: 'brightness params', step: 0.01, max: 1, min: -1 });
      postProcessingFolder.add(this.effects[3].pass.params, 'contrast', { label: 'contrast params', step: 0.01, max: 2 });

      postProcessingFolder.add(this.effects[4], 'active', { label: 'dof' });
      postProcessingFolder.add(this.effects[4].pass.params, 'focalDistance', { label: 'dof params focalDistance', step: 0.01, max: 5 });
      postProcessingFolder.add(this.effects[4].pass.params, 'aperture', { label: 'aperture', step: 0.01, max: 5 });
      postProcessingFolder.add(this.effects[4].pass, 'params', { label: 'dof params' });

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
        pass: new DepthPass()
      }
    ];
  }

  update (time, dt) {
    if (this.effects[1].active && this.effects[1].shake) {
      var blur = 1 + Math.random() * 4;
      this.effects[1].pass.params.delta = new Vector2(blur, blur);
    }
  }

}
