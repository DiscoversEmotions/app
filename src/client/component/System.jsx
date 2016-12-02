import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Button from '~/component/Button';
import SimpleMessage from '~/component/SimpleMessage';
import { compose, ConnectReact } from '~/core';
import { inject } from 'react-tunnel';
import { allMessages } from '~/computed';

const MESSAGES_MARGIN = 5;

const Container = styled.div`
  position: absolute;
  height: 500px;
  width: 500px;
  bottom: 0;
  right: 0;
  padding: 0;
  font-family: 'Anonymous Pro', monospace;
  color: white;
  text-align: left;
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
  var distFromBottom = MESSAGES_MARGIN;
  const messages = props.messages.map(msg => {
    const msgType = systemManager.getMessageType(msg);
    const result = Object.assign(
      {},
      msg,
      {
        msgType,
        distFromBottom
      }
    );
    distFromBottom += MESSAGES_MARGIN + msgType.height;
    return result;
  });

  return (
    <Container>
      {
        messages.map(msg => {
          switch (msg.msgType.key) {
            case `message`: return <SimpleMessage msg={msg} />
            default: return null;
          }
        })
      }
    </Container>
  );
});

export default System;
