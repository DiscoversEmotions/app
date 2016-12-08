import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const Message = styled.div`
  position: absolute;
  bottom: ${(props) => props.bottomDist }px;
  height: 26px;
  width: 500px;
  font-family: 'Anonymous Pro', monospace;
  text-align: right;
  padding: 0;
  box-sizing: border-box;
  transition-duration: .3s;
  margin: 0;
  right: 0px;
  font-size: 16px;
  color: white;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
`;

const MessageConsole = (props) => {
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
};

export default MessageConsole;
