import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';

const EmotionRecovered = (props) => {
  const { msg } = props;
  return (
    <Message
      msg={msg}
      title='Emotion Recovered'
    >
      Emotion Recovered
    </Message>
  )
};

export default EmotionRecovered;
