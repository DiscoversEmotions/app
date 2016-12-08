import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';
import Button from '~/component/Button';

const DeleteOrNot = (props) => {
  const { msg } = props;
  return (
    <Message
      msg={msg}
      title='Delete ?'
    >
      Delete ?
      <Button>Press [enter] to delete</Button>
      <Button>Press [n] to keep</Button>
    </Message>
  )
};

export default DeleteOrNot;
