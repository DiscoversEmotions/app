import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import { compose, ConnectReact } from '~/core';
import System from '~/component/System';
import Credits from '~/component/Credits';
import Modal from '~/component/Modal';
import { showModal } from '~/computed';

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
  ConnectReact(
    {
      showModal: showModal
    }
  )
)((props) => {
  return (
    <AppContainer>
       <System />
       { props.showModal && <Modal /> }
    </AppContainer>

  );
});

export default App;
