module.exports = function () {
  return {
    "extends": 'eslint:recommended',
    "parser": 'babel-eslint',
    "env": {
      "browser": true,
      "commonjs": true,
      "es6": true
    },
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
        "backtick"
      ],
      "semi": [
        "error",
        "always"
      ]
    }
  }
}
