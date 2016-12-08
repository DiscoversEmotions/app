import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';
import Button from '~/component/Button';

const AreYouSure = (props) => {
  const { msg } = props;
  return (
    <Message
      msg={msg}
      title='Are you sure'
    >
      <Button>Press [enter] to delete</Button>
      <Button>Press [y] to keep</Button>
    </Message>
  )
};

export default AreYouSure;
