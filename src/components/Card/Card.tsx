import React from 'react';
import * as Styled from './Card.styles';

interface IProps {
  children: React.ReactNode;
}

const Card = ({ children }: IProps) => (
  <Styled.Card>
    <Styled.Inner>{children}</Styled.Inner>
  </Styled.Card>
);

export default Card;
