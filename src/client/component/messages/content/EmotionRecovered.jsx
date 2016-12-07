import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';

function getEmotionName (level) {
  switch (level) {
    case 1: return `Love`;
    case 2: return `Anger`;
    case 3: return `Sadness`;
  }
}

function getEmotionFile (level) {
  switch (level) {
    case 1: return `/data/emotions/love.em`;
    case 2: return `/data/emotions/anger.em`;
    case 3: return `/data/emotions/sadness.em`;
  }
}

const Text = styled.p`
  font-size: 14px;
  padding-left: 20px;
`;

const EmotionFile = styled.p`
  font-family: 'Anonymous Pro', monospace;
  font-size: 13px;
  padding-left: 40px;
  padding-top: 6px;
  color: white;
`;

const EmotionRecovered = (props) => {
  const { msg } = props;
  return (
    <Message
      msg={msg}
      title='Emotion Recovered'
    >
      <Text>
        The emotion { getEmotionName(msg.level) } is almost recovered !
      </Text>
      <EmotionFile>{ getEmotionFile(msg.level) } : OK </EmotionFile>
    </Message>
  )
};

export default EmotionRecovered;
