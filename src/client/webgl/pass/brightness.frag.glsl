uniform float brightness;
uniform float contrast;
uniform sampler2D tDiffuse;

varying vec2 vUv;

void main() {

  vec3 color = texture2D(tDiffuse, vUv).rgb;
  vec3 colorContrasted = (color) * contrast;
  vec3 bright = colorContrasted + vec3(brightness,brightness,brightness);
  gl_FragColor.rgb = bright;
  gl_FragColor.a = 1.;

}
