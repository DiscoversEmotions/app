import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Button from '~/component/Button';
import MessageBox from '~/component/MessageBox';
import NeedRecovery from '~/component/NeedRecovery';
import { compose, ConnectReact } from '~/core';
import { inject } from 'react-tunnel';
import { lastMessage } from '~/computed';

const MessageSimple = compose(
  inject((provided) => ({ core: provided.core })),
  // ConnectReact(
  //   {
  //     lastMessage: lastMessage
  //   }
  // )
)((props) => {
  const msg = props.msg;
  return (
    <MessageBox bottomDist={ msg.distFromBottom } theHeight={ msg.msgType.height } theWidth={ msg.width || 300 } >
      { props.core.systemManager.formatMessage(msg) }
    </MessageBox>
  );
});

export default MessageSimple;
