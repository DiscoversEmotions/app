uniform float time;
uniform vec3 color;

varying vec3 vNormal;

void main() {

  // vec3 newColor = vec3(color.r * sin(time), color.g * sin(time + 10.0), color.b * sin(time + 20.0));
  // gl_FragColor = vec4(newColor, 1.0);

  vec3 light = vec3(0.5, 0.2, 1.0);
  light = normalize(light);
  float dProd = max(0.0,
                    dot(vNormal, light));

  gl_FragColor = vec4(dProd, // R
                      dProd, // G
                      dProd, // B
                      1.0);  // A
}
