import { Steps } from '~/types';

export function getDuration (defaultDuration) {
  return function getDurationAction ({ input }) {
    if (input.duration) {
      return {};
    }
    return { duration: defaultDuration };
  };
}

function getNext (step, level) {
  if (step === Steps.Boot) {
    return { step: Steps.Room, level: level };
  }
  if (step === Steps.Room) {
    return { step: Steps.EmotionExplain, level: level };
  }
  if (step === Steps.EmotionExplain) {
    return { step: Steps.EmotionRecovered, level: level };
  }
  if (step === Steps.EmotionRecovered) {
    return { step: Steps.Memory, level: level };
  }
  if (step === Steps.Memory) {
    return { step: Steps.MemoryDone, level: level };
  }
  if (step === Steps.MemoryDone) {
    if (level < 3) {
      return { step: Steps.EmotionExplain, level: level + 1 };
    }
  }
  console.error(`Whaaaat ?`);

}

export function setNextStep ({ state }) {
  const step = state.get(`app.step`);
  const level = state.get(`app.level`);
  const next = getNext(step, level);
  state.set(`app.step`, next.step);
  state.set(`app.level`, next.level);
}
