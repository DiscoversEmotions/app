import { Component, connect } from '~/core';
// import WebGLMainApp from './WebGLMainApp';
import dominus from 'dominus';
import styles from './WebGLMain';
import mainComposer from './deleteMe';

class WebGLMain extends Component {

  constructor ($parent) {
    super($parent);
    this.$el.addClass(styles.container);

    // this.webGLApp = new WebGLMainApp(this.$el[0]);
    // this.webGLApp.boot();
  }

  update () {
  }

}

export default connect()(WebGLMain);
