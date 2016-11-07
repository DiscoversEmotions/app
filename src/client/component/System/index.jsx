import React from 'react';
import WebGlMainApp from '~/webgl/Main';
import { BindCSS } from '~/core';
import { connect } from 'react-redux';
import styles from './System';
import { switchColor } from '~/redux/system';
import { Link } from 'redux-little-router';

@connect(
  (state) => ({
    color: state.system.get(`color`)
  }),
  { switchColor }
)
@BindCSS(styles)
class System extends React.Component {

  render() {
    console.log(this.props);
    return (
      <div
        styleName='system'
        onClick={ () => this.props.switchColor() }
        style={{ background: this.props.color }}
        >
        <Link href='/about'>Go About</Link>
      </div>
    );
  }

}

export default System;
