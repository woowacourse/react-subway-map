import React from 'react';
import * as Styled from './ColorPalette.styles';
import { Color } from '../../types';

interface IProps {
  onClick: (color: Color) => void;
}

const ColorPalette = ({ onClick }: IProps) => (
  <Styled.ColorPalette>
    {Object.entries(Color).map(([, color]) => (
      <Styled.Button key={color} onClick={() => onClick(color)} type="button" color={color} />
    ))}
  </Styled.ColorPalette>
);

export default ColorPalette;
