import React from 'react';
import * as Styled from './Card.styles';
import { CardVariant } from './Card.types';

interface IProps {
  children: React.ReactNode;
  variant?: CardVariant;
}

const Card = ({ children, variant = 'primary' }: IProps) => (
  <Styled.Card variant={variant}>
    <Styled.Inner>{children}</Styled.Inner>
  </Styled.Card>
);

export default Card;
