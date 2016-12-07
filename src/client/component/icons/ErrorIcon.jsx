import React from 'react';
import styled, { css } from 'styled-components';
import _ from 'lodash';

const Container = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

const ErrorIcon = (props) => {
  return (
    <Container size={props.size} style={props.style} dangerouslySetInnerHTML={{__html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 683 546">
          <g id="Calque_2" data-name="Calque 2">
              <g id="Calque_1-2" data-name="Calque 1">
                <polygon
                  style="fill: none; stroke: ${ props.color }; stroke-linecap: round; stroke-linejoin: round; stroke-width: ${ props.strokeWidth }px;" points="341.5 4.5 4.5 541.5 678.5 541.5 341.5 4.5"
                />
                <path
                  style="fill: ${ props.color }"
                  d="M342.53,192.8a11.67,11.67,0,0,1,11.72,11.52L355,390.46a11.46,11.46,0,0,1-3.52,8.4,11.72,11.72,0,0,1-19.92-8.2l-.78-186.13a11.36,11.36,0,0,1,11.72-11.72Zm-8,260.74a11.14,11.14,0,0,1,8.2-3.32,11.39,11.39,0,0,1,8.4,3.32,11.79,11.79,0,0,1,0,16.41,11.47,11.47,0,0,1-8.4,3.52,11.24,11.24,0,0,1-8.2-3.52,11.33,11.33,0,0,1,0-16.41Z"
                />
              </g>
          </g>
      </svg>
    `}}>

    </Container>
  );
};

ErrorIcon.propTypes = {
  color: React.PropTypes.string,
  size: React.PropTypes.number,
  strokeWidth: React.PropTypes.number
};

ErrorIcon.defaultProps = {
  color: `#EF5350`,
  size: 20,
  strokeWidth: 9
}

export default ErrorIcon;
