uniform float time;

void main() {

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0) * vec4(0.7 + (sin(time) * 0.5), 1.0, 1.0, 1.0);

}
