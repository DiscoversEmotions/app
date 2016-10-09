module.exports = function () {
  const envs = {
    prod: ['prod', 'production'],
    dev: ['dev', 'development'],
  };

  // Resolve BUILD_ENV
  var buildEnv = process.env.BUILD_ENV;
  if (buildEnv === null || buildEnv === undefined) {
    console.error('*************************************************************');
    console.error('** You must define BUILD_ENV as an environement variable ! **');
    console.error('*************************************************************');
    throw new Error('You must define BUILD_ENV as an environement variable !');
  }
  for (let env in envs) {
    let aliases = envs[env];
    if (aliases.indexOf(buildEnv) > -1) {
      buildEnv = env;
      break;
    }
  }

  return buildEnv;
};

// const __ENV__ = __BUILD_ENV__;
// const __DEV__ = __ENV__ === 'dev';
// const __PROD__ = __ENV__ === 'prod';
// const __DEBUG__ = __DEV__;
// const __COMPILED__ = __PROD__;
//
// // Define NODE_ENV
// var __NODE_ENV__ = 'production';
// if (__DEBUG__) {
//   __NODE_ENV__ = 'development';
// }
// process.env.NODE_ENV = __NODE_ENV__;
//
// export default {
//   __ENV__,
//   __DEV__,
//   __PROD__,
//   __NODE_ENV__,
//   __COMPILED__
// };
