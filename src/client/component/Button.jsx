import styled, { keyframes } from 'styled-components';

const blinkAnim = keyframes`
  0%   { opacity: 1; }
  50%  { opacity: 1; }
  75%  { opacity: 0.4; }
  100% { opacity: 1; }
`;

export default styled.div`
  cursor: default;
  border: none;
  padding: 20px 20px;
  padding-bottom: ${(props) => props.paddingBottom || 20}px;
  padding-top: ${(props) => props.paddingTop || 20}px;
  border-radius: 100px;
  color: white;
  background: none;
  line-height: 1.4;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  animation: ${blinkAnim} 2s infinite;
`;
