export function setWorld (world) {
  return (state) => {
    return state.setIn([`world`, `current`], world);
  };
}

export function startTransition () {
  return (state) => {
    return state.setIn([`world`, `transitionInProgress`], true);
  };
}

export function endTransition () {
  return (state) => {
    return state.setIn([`world`, `transitionInProgress`], false);
  };
}
