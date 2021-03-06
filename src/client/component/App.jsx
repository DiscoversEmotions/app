import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import { compose, ConnectReact } from '~/core';
import System from '~/component/System';
import Menu from '~/component/Menu';
import Logo from '~/component/Logo';
import Credits from '~/component/Credits';
import { canStartRoom } from '~/computed';
import { Steps } from '~/types';

require('normalize.css/normalize.css');

injectGlobal`
  html, body {
    font-family: 'Hind Siliguri', sans-serif;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  p, h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`;


const AppContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &:after{
    background: url(${require(`~/assets/noise.png`)});
    position: absolute;
    content: '';
    z-index: 1;
    opacity: 0.3;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }
`;

const App = compose(
  ConnectReact(
    {
      step: `app.step`
    }
  )
)((props) => {
  return (
    <AppContainer>
      {((props.step === Steps.Boot) ? <Logo /> : <Menu />)}
      {((props.step === Steps.Credits) ? <Credits /> : <System />)}
    </AppContainer>
  );
});

export default App;
