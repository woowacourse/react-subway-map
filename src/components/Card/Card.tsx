import React from 'react';
import * as Styled from './Card.styles';
import { CardVariant } from './Card.types';

interface Props {
  children: React.ReactNode;
  variant?: CardVariant;
}

const Card = ({ children, variant = 'primary' }: Props) => (
  <Styled.Card variant={variant}>
    <Styled.Inner>{children}</Styled.Inner>
  </Styled.Card>
);

export default Card;
