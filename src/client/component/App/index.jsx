import React from 'react';
import styles from './App';
import { BindCSS } from '~/core';
import WebGLMain from '~/component/WebGLMain';
import WebGLRoom from '~/component/WebGLRoom';
import System from '~/component/System';

console.log(styles);

@BindCSS(styles)
class App extends React.Component {
  render() {
    return (
      <div styleName='app-container'>
        <WebGLRoom />
        <System />
      </div>
    );
  }
}

export default App;
