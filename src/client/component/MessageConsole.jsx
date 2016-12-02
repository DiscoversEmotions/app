import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Button from '~/component/Button';
import MessageBox from '~/component/MessageBox';
import NeedRecovery from '~/component/NeedRecovery';
import { compose, ConnectReact } from '~/core';
import { inject } from 'react-tunnel';
import { lastMessage } from '~/computed';

const Message = styled.div`
  position: absolute;
  bottom: ${(props) => props.bottomDist }px;
  height: 26px;
  width: 500px;
  font-family: 'Anonymous Pro', monospace;
  text-align: right;
  padding: 5px 10px;
  box-sizing: border-box;
  margin: 0;
  right: 10px;
  font-size: 16px;
  color: white;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
`;

const MessageConsole = compose(
  inject((provided) => ({ core: provided.core })),
  // ConnectReact(
  //   {
  //     lastMessage: lastMessage
  //   }
  // )
)((props) => {
  const msg = props.msg;
  return (
    <Message bottomDist={ msg.distFromBottom } >
      { props.core.systemManager.formatMessage(msg) }
    </Message>
  );
});

export default MessageConsole;
