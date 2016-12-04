import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Button from '~/component/Button';
import MessageBox from '~/component/messages/MessageBox';
import { compose } from '~/core';
import { inject } from 'react-tunnel';
import { NUMBER_OF_MEMORIES, NUMBER_OF_EMOTIONS } from '~/types';

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
  inject((provided) => ({ core: provided.core }))
)((props) => {
  const msg = props.msg;
  const content = (() => {
    switch (msg.key) {
    case `empty`: return (``);
    case `boot`: return (`Start Booting System`);
    case `boot-progress`: return (`Booting System... ${msg.progress} / 100`);
    case `boot-done`: return (`System booted`);
    case `connect-eyes`: return (`Connecting to the ocular system`);
    case `connect-eyes-progress`: return (`Connecting to the ocular system... ${ Math.floor(msg.progress) } / 100`);
    case `connect-eyes-done`: return (`Ocular system connected`);
    case `load-memory-progress`: return (`Retrieving memories... ${msg.progress} / ${NUMBER_OF_MEMORIES}`);
    case `load-memory-done`: return (`${NUMBER_OF_MEMORIES} / ${NUMBER_OF_MEMORIES} memories retrieved - No error`);
    case `load-emotions-progress`: return (`Retrieving emotions... ${msg.progress} / ${NUMBER_OF_EMOTIONS}`);
    case `load-emotions-error`: return (`Warning: The following emotion is missing :`);
    case `load-emotions-error-love`: return (`Love [/system/emotions/love.dg]`);
    case `load-emotions-error-anger`: return (`Anger [/system/emotions/anger.dg]`);
    case `load-emotions-error-sadness`: return (`Sadness [/system/emotions/sadness.dg]`);
    case `load-emotions-done`: return (`${NUMBER_OF_EMOTIONS - 3} / ${NUMBER_OF_EMOTIONS} emotions retrieved - 3 errors`);
    case `need-recovery`: return (`Recovery process is neeeded !`);
    case `emotion-recovered`: return (`Emotion Recovered`);
    case `linked-memory`: return (`Linked Memory found !`);
    default:
      console.error(new Error(`Message key ${msg.key} ??`));
      throw new Error(`Message key ${msg.key} ??`);
    }
  })();
  return (
    <Message bottomDist={ msg.distFromBottom } >
      { content }
    </Message>
  );
});

export default MessageConsole;
