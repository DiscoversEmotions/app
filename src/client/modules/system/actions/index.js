
export function planNextMessage ({ state, input, controller }) {
  return new Promise(function(resolve, reject) {
    const time = input.time || 300;
    setTimeout(() => {
      state.push(`system.messages`, input.message);
      resolve();
    }, time);
  });
}
