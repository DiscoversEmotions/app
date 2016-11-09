export function setForward (enabled) {
  return (state) => {
    return state.setIn([`movement`, `forward`], enabled);
  };
}
