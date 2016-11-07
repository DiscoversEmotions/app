import React from 'react';
import WebGlRoomApp from '~/webgl/Room';
import { BindCSS } from '~/core';
import styles from './WebGLRoom';
import { connect } from 'react-redux';

@connect(
  (state) => ({
    state
  })
)
@BindCSS(styles)
class WebGLRoom extends React.Component {

  componentDidMount() {
    this.app = new WebGlRoomApp(this.screen);
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

export default WebGLRoom;
