import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import { compose, ConnectReact } from '~/core';
import System from '~/component/System';
import Credits from '~/component/Credits';

require('normalize.css/normalize.css');

injectGlobal`
  html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
`;

const AppContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const App = compose(
  // ConnectReact(
  //   {}
  // )
)((props) => {
  return (
    <AppContainer>
      <System />
    </AppContainer>
  );
});

export default App;
