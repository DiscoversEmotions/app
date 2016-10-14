import WebGLMain from '~/component/WebGLMain';
import Loader from '~/component/Loader';
import { Component, connect } from '~/core';
import dominus from 'dominus';
import classes from './App';

class App extends Component {

  constructor($parent) {
    super($parent);
    this.$el.addClass(classes.container);

    this.addChild(`webGLApp`, WebGLMain);
    this.addChild(`loader`, Loader);
  }

  update () {
  }

}

export default connect()(App);
