import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';

const AllEmotionsRecovered = (props) => {
  const { msg } = props;
  return (
    <Message
      msg={msg}
      title='All Emotions Recovered'
    >
      All Emotions Recovered
    </Message>
  )
};

export default AllEmotionsRecovered;
