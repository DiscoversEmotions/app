export function resize (width, height) {
  return (state) => {
    return state
    .setIn([`size`, `width`], width)
    .setIn([`size`, `height`], height);
  };
}
