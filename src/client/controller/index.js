import Devtools from 'cerebral/devtools';
import {
  Controller
} from 'cerebral';
import {
  state,
  set
} from 'cerebral/operators';

export default Controller({
  devtools: Devtools(),
  state: {
    title: `Hello from Cerebral!`,
    subTitle: `Working on my state management`
  },
  signals: {
    buttonClicked: [
      set(state `subTitle`, `Updating some state`)
    ]
  }
});
