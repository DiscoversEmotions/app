module.exports = function () {
  return {
    "env": {
      "browser": true,
      "commonjs": true,
      "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
      "sourceType": "module",
      "ecmaFeatures": {
        "experimentalObjectRestSpread": true
      }
    },
    "rules": {
      "indent": [
        "error",
        2
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
      "quotes": [
        "error",
        "single"
      ],
      "semi": [
        "error",
        "always"
      ]
    }
  }
}
