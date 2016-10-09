import vdom from 'virtual-dom';
import main from 'main-loop';

import App from './App.jsx';
import store from './store';
import initSocket from './socket';

function render (state) {
  var result = null;
  try {
    result = App(state, store.dispatch);
  } catch (e) {
    console.error(e);
    return null;
  }
  return result;
}

var loop = main(store.getState(), render, vdom)
document.querySelector('#app').appendChild(loop.target)

store.subscribe(() =>
  loop.update(store.getState())
);

initSocket(store);
