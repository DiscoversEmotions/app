import { ShaderMaterial, Color, DoubleSide, UniformsUtils, UniformsLib, ShaderLib } from 'three';

import vertexShader from './shader/cube_vert.glsl';
import fragmentShader from './shader/cube_frag.glsl';

/**
 * CubeMaterial class
 */
class CubeMaterial extends ShaderMaterial {

  /**
   * constructor method
   * @param {Object} options Options
   */
  constructor(geom) {
    let uniforms = UniformsUtils.merge([
      ShaderLib['lambert'].uniforms
    ]);
    super({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms,
      side: DoubleSide,
      transparent: true,
      lights: true
    });
  }

  /**
   * update method
   * @param {number} time Time
   */
  update(time, dt) {
  }
}

export default CubeMaterial;
