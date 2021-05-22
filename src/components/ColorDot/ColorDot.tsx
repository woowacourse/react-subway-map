import React from 'react';
import { Color } from '../../types';
import * as Styled from './ColorDot.styles';

interface IProps {
  color: Color;
}

const ColorDot = ({ color }: IProps) => <Styled.ColorDot color={color} />;

export default ColorDot;
