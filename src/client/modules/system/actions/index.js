
export function planNextMessage ({ state, input, controller }) {
  return new Promise(function(resolve, reject) {
    const time = input.time || 300;
    setTimeout(() => {
      state.push(`system.messages`, input.message);
      state.splice(`system.messages`, -8);
      resolve();
    }, time);
  });
}
