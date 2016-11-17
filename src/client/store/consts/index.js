import { Steps } from '~/types';

export const bootMessages = [
  { id: 1, time: 1000, value: `Connection au système nerveux...` },
  { id: 2, time: 3000, value: `Récupération des souvenirs... 1/3450` },
  { id: 3, time: 3500, value: `Récupération des souvenirs... 2/3450` },
  { id: 4, time: 4000, value: `Mise à jour des règles de d'analyse...` },
  { id: 5, time: 4500, value: `Récupération des émotions ... 1/47` },
  { id: 6, time: 5000, value: `Récupération des émotions ... 2/47` },
  { id: 7, time: 6000, value: `Erreur: Emotion maquante : Joie` },
  { id: 8, time: 7000, value: `Erreur: Emotion maquante : Colère` }
];

export const stepsWithSystemFull = [
  Steps.MissingFiles,
  Steps.RecoveryWillStart,
  Steps.RecoveryLvl1Done
];

export const stepsWithGlitch = [
  Steps.RecoveryLvl1
];
