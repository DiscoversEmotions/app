import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Button from '~/component/Button';
import MessageSimple from '~/component/messages/MessageSimple';
import MessageConsole from '~/component/messages/MessageConsole';
import MessageRecovery from '~/component/messages/MessageRecovery';
import LoadEmotionsProgress from '~/component/messages/LoadEmotionsProgress';
import { compose, ConnectReact } from '~/core';
import { inject } from 'react-tunnel';
import { displayedMessages } from '~/computed';
import { MESSAGES_MARGIN } from '~/types';

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
      messages: `system.messages`
    }
  )
)((props) => {
  const systemManager = props.core.systemManager;
  var distFromBottom = MESSAGES_MARGIN;
  const messages = props.messages.slice(-8).map(msg => Object.assign({}, msg));
  _.forEachRight(messages, (msg) => {
    msg.type = systemManager.getMessageType(msg);
    msg.height = systemManager.getMessageHeight(msg);
    msg.distFromBottom = distFromBottom;
    distFromBottom += MESSAGES_MARGIN + msg.height;
  });

  return (
    <Container>
      {
        messages.map(msg => {
          switch (msg.type) {
            case `console`: return <MessageConsole msg={msg} />;
            case `simple`: return <MessageSimple msg={msg} />;
            default: return null;
          }
        })
      }
    </Container>
  );
});

export default System;
