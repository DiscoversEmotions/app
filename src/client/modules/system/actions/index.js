
export function planNextMessage ({ state, input, controller }) {
  return new Promise(function(resolve, reject) {
    const time = input.time || 300;
    setTimeout(() => {
      // const messages = state.get(`system.messages`);
      // console.log(state);
      // state.splice(`system.messages`, -8);
      state.push(`system.messages`, input.message);
      resolve();
    }, time);
  });
}
