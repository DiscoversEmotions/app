import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Button from '~/component/Button';
import Message from '~/component/messages/Message';
import MessageConsole from '~/component/messages/MessageConsole';
import LoadMemories  from '~/component/messages/content/LoadMemories';
import LoadEmotions  from '~/component/messages/content/LoadEmotions';
import NeedRecovery  from '~/component/messages/content/NeedRecovery';
import { compose, ConnectReact } from '~/core';
import { inject } from 'react-tunnel';
import { displayedMessages } from '~/computed';

function getMessageType(msg) {
  if (_.includes([
    `boot`, `boot-progress`, `boot-done`, `connect-eyes`, `connect-eyes-progress`, `connect-eyes-done`
  ], msg.key)) {
    return `console`;
  }
  return `simple`;
}

function getMessageHeight(msg) {
  if (msg.type === `console`) {
    return 26;
  }
  switch (msg.key) {
    case `load-memory-progress`: return 85;
    case `load-emotions-progress`: return (() => {
      var height = 85;
      if (msg.progress >= 10) { height += 50; }
      if (msg.progress >= 21) { height += 50; }
      if (msg.progress >= 37) { height += 50; }
      return height
    })();
    case `need-recovery`: return 180;
  }
  return 60;
}

const Container = styled.div`
  position: absolute;
  height: 500px;
  width: 500px;
  bottom: 40px;
  right: 50px;
  padding: 0;
  font-family: 'Anonymous Pro', monospace;
  color: white;
  text-align: left;
  line-height: 1.5;
  z-index: 500;
`;

const System = compose(
  ConnectReact(
    {
      messages: `system.messages`
    }
  )
)((props) => {
  var distFromBottom = 0;
  const messages = props.messages.slice(-8).map(msg => Object.assign({}, msg));
  _.forEachRight(messages, (msg) => {
    msg.type = getMessageType(msg);
    msg.height = getMessageHeight(msg);
    msg.distFromBottom = distFromBottom;
    distFromBottom += msg.height;
  });

  return (
    <Container>
      {
        messages.map(msg => {
          if (msg.type === `console`) {
            return <MessageConsole msg={msg} />;
          }
          switch (msg.key) {
            case `load-memory-progress`: return <LoadMemories msg={msg} />;
            case `load-emotions-progress`: return <LoadEmotions msg={msg} />;
            case `need-recovery`: return <NeedRecovery msg={msg} />;
          }
          return (
            <Message msg={ msg } type='error'>
              TODO : { msg.key }
            </Message>
          );
        })
      }
    </Container>
  );
});

export default System;
