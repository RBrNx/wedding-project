import React from 'react';
import styled from 'styled-components/native';

const StatusLine = ({ colour = '#fff', isFirst = true, isLast = true, style }) => {
  return <Line colour={colour} isFirst={isFirst} isLast={isLast} style={style} />;
};

const Line = styled.View`
  height: 100%;
  width: 5px;
  background-color: ${props => props.colour};
  border-top-right-radius: ${props => (props.isFirst ? 2.5 : 0)}px;
  border-top-left-radius: ${props => (props.isFirst ? 2.5 : 0)}px;
  border-bottom-left-radius: ${props => (props.isLast ? 2.5 : 0)}px;
  border-bottom-right-radius: ${props => (props.isLast ? 2.5 : 0)}px;
`;

export default StatusLine;
