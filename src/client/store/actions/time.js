
export function set(stepName, time) {
  return (state) => {
    return state.setIn([`time`, stepName], time);
  };
}
