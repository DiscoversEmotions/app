
import Vue from 'vue';
import App from '~/component/App';

import store from './store';

new Vue({
  el: `#app`,
  store,
  render: h => h(App)
});
