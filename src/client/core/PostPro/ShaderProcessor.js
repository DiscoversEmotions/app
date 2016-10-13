import { Texture, Vector2, Vector3, Vector4, Matrix2, Matrix3, Matrix4, ShaderMaterial, FlatShading } from 'three';

export class ShaderProcessor {
  constructor() {
    this.regExp = /uniform\s+([^\s]+)\s+([^\s]+)\s*;/gi;
    this.regExp2 = /uniform\s+([^\s]+)\s+([^\s]+)\s*\[\s*(\w+)\s*\]*\s*;/gi;

    this.typesMap = {
      sampler2D: { type: 't', value() { return new Texture(); } },
      samplerCube: { type: 't', value() {} },

      bool: { type: 'b', value() { return 0; } },
      int: { type: 'i', value() { return 0; } },
      float: { type: 'f', value() { return 0; } },

      vec2: { type: 'v2', value() { return new Vector2(); } },
      vec3: { type: 'v3', value() { return new Vector3(); } },
      vec4: { type: 'v4', value() { return new Vector4(); } },

      bvec2: { type: 'v2', value() { return new Vector2(); } },
      bvec3: { type: 'v3', value() { return new Vector3(); } },
      bvec4: { type: 'v4', value() { return new Vector4(); } },

      ivec2: { type: 'v2', value() { return new Vector2(); } },
      ivec3: { type: 'v3', value() { return new Vector3(); } },
      ivec4: { type: 'v4', value() { return new Vector4(); } },

      mat2: { type: 'v2', value() { return new Matrix2(); } },
      mat3: { type: 'v3', value() { return new Matrix3(); } },
      mat4: { type: 'v4', value() { return new Matrix4(); } }
    };

    this.arrayTypesMap = {
      float: { type: 'fv', value() { return []; } },
      vec3: { type: 'v3v', value() { return []; } }
    };
  }

  process(vertexShaderCode, fragmentShaderCode) {

    let matches;
    const uniforms = {
      resolution: { type: 'v2', value: new Vector2( 1, 1 ), default: true },
      time: { type: 'f', value: Date.now(), default: true },
      tInput: { type: 't', value: new Texture(), default: true }
    };

    let uniformType;
    let uniformName;
    let arraySize;

    while ((matches = this.regExp.exec(fragmentShaderCode)) !== null) {
      if (matches.index === this.regExp.lastIndex) {
        this.regExp.lastIndex++;
      }
      uniformType = matches[1];
      uniformName = matches[2];

      uniforms[uniformName] = {
        type: this.typesMap[uniformType].type,
        value: this.typesMap[uniformType].value()
      };
    }

    while ((matches = this.regExp2.exec(fragmentShaderCode)) !== null) {
      if (matches.index === regExp.lastIndex) {
        regExp.lastIndex++;
      }
      uniformType = matches[1];
      uniformName = matches[2];
      arraySize = matches[3];

      uniforms[uniformName] = {
        type: this.arrayTypesMap[uniformType].type,
        value: this.arrayTypesMap[uniformType].value()
      };
    }

    const shader = new ShaderMaterial({
      uniforms,
      vertexShader: vertexShaderCode,
      fragmentShader: fragmentShaderCode,
      shading: FlatShading,
      depthWrite: false,
      depthTest: false,
      transparent: true
    });

    return shader;
  }
}
