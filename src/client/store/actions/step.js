import { fromJS } from 'immutable';

export function setCurrent (step) {
  return (state) => {
    return state.set(`step`, step);
  };
}

// export function setData (stepName, data) {
//   return (state) => {
//     return state.setIn([`step`, `data`, stepName], fromJS(data));
//   };
// }
//
// export function setCurrentData (data) {
//   var currentStep = state.getIn([`step`, `current`]);
//   return setData(currentStep, data);
// }
//
// export function updateData (stepName, updater) {
//   return (state) => {
//     return state.updateIn([`step`, `data`, stepName], updater);
//   };
// }
