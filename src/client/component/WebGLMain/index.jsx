import React from 'react';
import WebGlMainApp from '~/webgl/Main';
import { BindCSS } from '~/core';
import styles from './WebGLMain';
import { connect } from 'react-redux';

@connect(
  (state) => ({
    state
  })
)
@BindCSS(styles)
class WebGLMain extends React.Component {

  componentDidMount() {
    this.app = new WebGlMainApp(this.screen);
  }

  render() {
    if (this.app) {
      this.app.updateState(this.props.state);
    }
    console.log(this.props);
    return (
      <div
        ref={(screen) => this.screen = screen}
        styleName='container'
      ></div>
    );
  }

}

export default WebGLMain;
