import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';

const Text = styled.p`
  font-size: 14px;
  padding-left: 20px;
`;

const AllEmotionsRecovered = (props) => {
  const { msg } = props;
  return (
    <Message
      msg={msg}
      type='success'
      title='All Emotions Recovered'
    >
      <Text>
        All Emotions Recovered.
      </Text>
    </Message>
  )
};

export default AllEmotionsRecovered;
