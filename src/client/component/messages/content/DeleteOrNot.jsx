import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';
import Button from '~/component/Button';
import ErrorIcon from '~/component/icons/ErrorIcon';

const DeleteOrNot = (props) => {
  const { msg } = props;
  return (
    <Message
      msg={msg}
      type='error'
      title='Delete ?'
      icon={ <ErrorIcon color='white' size={26} strokeWidth={35} /> }
    >
      Delete ?
      <Button>Press [enter] to delete</Button>
      <Button>Press [n] to keep</Button>
    </Message>
  )
};

export default DeleteOrNot;
