import React from 'react';
import styled from 'styled-components';

const MessageBox = styled.div`
  position: absolute;
  bottom: ${(props) => props.bottomDist }px;
  height: ${(props) => props.theHeight }px;
  width: ${(props) => props.theWidth }px;
  font-family: sans-serif;
  text-align: left;
  padding: 5px 10px;
  box-sizing: border-box;
  margin: 0;
  right: 10px;
  font-size: 16px;
  color: black;
  background: white;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;


export default MessageBox;
