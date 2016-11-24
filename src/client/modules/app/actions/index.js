export function getDuration (defaultDuration) {
  return function getDurationAction ({ input }) {
    if (input.duration) {
      return {};
    }
    return { duration: defaultDuration };
  };
}
