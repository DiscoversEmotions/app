import styled, { keyframes } from 'styled-components';

const blinkAnim = keyframes`
  0%   { opacity: 1; }
  50%  { opacity: 1; }
  75%  { opacity: 0.4; }
  100% { opacity: 1; }
`;

export default styled.button`
  cursor: default;
  border: none;
  padding: 8px 20px;
  border-radius: 100px;
  color: white;
  background: none;
  line-height: 1.4;
  font-size: 16px;
  font-weight: 700;
  animation: ${blinkAnim} 2s infinite;
`;
