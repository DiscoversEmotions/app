import ReactDOM from 'react-dom';
import React from 'react';
import App from '~/component/App';
import { Provider } from 'react-redux';
import { RouterProvider } from 'redux-little-router';
import routes from './routes';
import { createStore } from '~/redux';

const rootEl = document.getElementById('app');
const store = createStore(routes);

ReactDOM.render(
  <Provider store={store}>
    <RouterProvider store={store}>
      <App />
    </RouterProvider>
  </Provider>,
  rootEl
);
