import React from 'react';
import { Color } from '../../types';
import * as Styled from './ColorDot.styles';

interface Props {
  color: Color;
}

const ColorDot = ({ color }: Props) => <Styled.ColorDot color={color} />;

export default ColorDot;
