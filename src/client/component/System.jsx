import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Button from '~/component/Button';
import SimpleMessage from '~/component/SimpleMessage';
import { compose, ConnectReact } from '~/core';
import { inject } from 'react-tunnel';
import { allMessages } from '~/computed';

const Container = styled.div`
  position: absolute;
  height: 500px;
  width: 500px;
  bottom: 20px;
  right: 40px;
  padding: 0;
  font-family: 'Anonymous Pro', monospace;
  color: white;
  text-align: right;
  line-height: 1.5;
  z-index: 500;
`;

const System = compose(
  inject((provided) => ({ core: provided.core })),
  ConnectReact(
    {
      messages: allMessages
    }
  )
)((props) => {
  const systemManager = props.core.systemManager;
  const messages = props.messages.slice().reverse();
  return (
    <Container>
      {
        messages.map(msg => {
          const msgType = systemManager.getMessageType(msg);
          switch (msgType.key) {
            case `message`: return <SimpleMessage />
            default: return null;
          }
        })
      }
    </Container>
  );
});

export default System;
