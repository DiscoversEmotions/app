uniform float time;
varying vec3 vNormal;
attribute vec2 displacement;

void main() {

  vNormal = normal;

  // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0) * vec4(0.7 + (sin(time) * 0.5), 1.0, 1.0, 1.0);
  float anim = 0.5 + (sin(time*30.0) * 0.5);

  float displacementVal = mix(displacement.x, displacement.y, anim);
  // float displacementVal = anim;

  vec3 newPosition =  position +
                      normal * vec3(displacementVal);

  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(newPosition, 1.0);
}
