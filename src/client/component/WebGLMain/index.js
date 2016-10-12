import { Component, connect } from '~/core';
import WebGLMainApp from './WebGLMainApp';
import dominus from 'dominus';
import classes from './WebGLMain';

class WebGLMain extends Component {

  constructor ($parent) {
    super($parent);
    this.$el.addClass(classes.container);

    this.webGLApp = new WebGLMainApp(this.$el[0]);
    this.webGLApp.boot();
  }

  update () {
  }

}

export default connect()(WebGLMain);
