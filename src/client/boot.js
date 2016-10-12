import App from '~/component/App';
import { store } from '~/redux';
import dominus from 'dominus';

const appElement = dominus.find('#app');
appElement.html('');
const app = new App(appElement);

store.subscribe(() => {
  app.rootUpdate();
});
app.rootUpdate();
