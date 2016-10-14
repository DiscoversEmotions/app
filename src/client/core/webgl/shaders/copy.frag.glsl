varying vec2 vUv;
uniform sampler2D uInput;

void main() {
  gl_FragColor = texture2D( uInput, vUv );
}
