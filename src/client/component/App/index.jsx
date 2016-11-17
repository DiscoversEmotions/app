import React from 'react';
import styles from './App';
import { BindCSS, Connect, compose } from '~/core';
import System from '~/component/System';
import TopMenu from '~/component/TopMenu';

function AppRender (props) {
  return (
    <div styleName='app-container'>
      <System />
      <TopMenu />
    </div>
  );
}

const App = compose(
  Connect(),
  BindCSS(styles)
)(AppRender);

export default App;
