import WebGLMain from '~/component/WebGLMain';
import Loader from '~/component/Loader';
import { Component, ConnectToStore } from '~/core/interface';
import dominus from 'dominus';
import styles from './App';

class App extends Component {

  constructor($parent) {
    super($parent);
    this.$el.addClass(styles.container);

    this.addChild(`webGLApp`, WebGLMain);
    this.addChild(`loader`, Loader);
  }

  update () {
  }

}

export default ConnectToStore()(App);
