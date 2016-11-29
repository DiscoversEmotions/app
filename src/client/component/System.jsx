import React from 'react';
import styled from 'styled-components';
import { Steps } from '~/types';
import _ from 'lodash';
import Button from '~/component/Button';
import Message from '~/component/Message';
import { compose, ConnectReact } from '~/core';
import { inject } from 'react-tunnel';
import { allMessages } from '~/computed';

const Container = styled.div`
  position: absolute;
  height: ${ (props) => (props.numberOfLines * 26) + `px` };
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
      messages: allMessages,
      numberOfLines: `system.numberOfLines`
    }
  )
)((props) => {
  const systemManager = props.core.systemManager;
  const messages = props.messages.slice().reverse();
  return (
    <Container full={props.full || false } numberOfLines={ props.numberOfLines }>
      {
        (() => {
          const result = [];
          for (var i = 0; i < props.numberOfLines; i++) {
            const msg = messages[i] !== undefined ? messages[i] : { key: `empty` };
            result.push(
              <Message key={i} type={ systemManager.getMessageType(msg) }>
                { systemManager.formatMessage(msg) }
              </Message>
            );
          }
          return result.reverse();
        })()
      }
    </Container>
  );
});

export default System;
