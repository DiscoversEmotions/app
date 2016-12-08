import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';
import Button from '~/component/Button';

const NewMemoriesFound = (props) => {
  const { msg } = props;
  return (
    <Message
      msg={msg}
      title='Analysing new Memories'
    >
      Analysing...
    </Message>
  )
};

export default NewMemoriesFound;
