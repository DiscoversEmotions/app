import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';
import Button from '~/component/Button';

const Text = styled.p`
  font-size: 14px;
  padding-left: 20px;
`;

const EmotionRecovered = (props) => {
  const { msg } = props;
  return (
    <Message
      msg={msg}
      type='success'
      title='Emotion Recovered'
    >
      <Text>
        Emotion {(() => {
          if (msg.level === 1) {
            return `Love`;
          } else if (msg.level === 2) {
            return `Anger`;
          } else if (msg.level === 3) {
            return `Sadness`;
          }
        })()} fully recovered.
      </Text>
      <Button>{ (() => {
        if (msg.level === 1) {
          return `Press [enter] to start recovering Anger emotion`;
        } else if (msg.level === 2) {
          return `Press [enter] to start recovering Sadness emotion`;
        } else if (msg.level === 3) {
          return `Press [enter] to end recovery process`;
        }
      })() }</Button>
    </Message>
  )
};

export default EmotionRecovered;
