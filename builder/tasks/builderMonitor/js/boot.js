import vdom from 'virtual-dom';
import main from 'main-loop';

import App from './App.jsx';
import store from './store';
import initSocket from './socket';

const socket = initSocket(store);

function render (state) {
  return App({ state, dispatch: store.dispatch, socket });
}

var loop = main(store.getState(), render, vdom)
document.querySelector('#app').appendChild(loop.target)

store.subscribe(() =>
  loop.update(store.getState())
);
