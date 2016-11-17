export function set(stepName, time) {
  return (state) => {
    return state.setIn([`times`, stepName], time);
  };
}
