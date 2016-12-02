import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Button from '~/component/Button';
import MessageSimple from '~/component/MessageSimple';
import MessageConsole from '~/component/MessageConsole';
import { compose, ConnectReact } from '~/core';
import { inject } from 'react-tunnel';
import { allMessages } from '~/computed';

const MESSAGES_MARGIN = 10;

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
  const messages = props.messages.slice(-8).map(msg => Object.assign({}, msg));
  _.forEachRight(messages, (msg) => {
    const msgType = systemManager.getMessageType(msg);
    msg.msgType = msgType;
    msg.distFromBottom = distFromBottom;
    distFromBottom += MESSAGES_MARGIN + msgType.height;
  });

  return (
    <Container>
      {
        messages.map(msg => {
          switch (msg.msgType.key) {
            case `simple`: return <MessageSimple msg={msg} />;
            case `console`: return <MessageConsole msg={msg} />;
            default: return null;
          }
        })
      }
    </Container>
  );
});

export default System;
