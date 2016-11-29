import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Button from '~/component/Button';
import Message from '~/component/Message';
import { compose, ConnectReact } from '~/core';
import { inject } from 'react-tunnel';
import { allMessages } from '~/computed';

const Container = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  left: 50%;
  top: 50%;
  background: red;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const Modal = compose(
  inject((provided) => ({ core: provided.core })),
  // ConnectReact(
  //   {}
  // )
)((props) => {
  return (
    <Container>
      This is a modal
    </Container>
  );
});

export default Modal;
