import React from 'react';
import * as Styled from './ColorPalette.styles';
import { Color } from '../../types';

const ColorPalette = () => (
  <Styled.ColorPalette>
    {Object.entries(Color).map(([, color]) => (
      <Styled.Button type="button" color={color} />
    ))}
  </Styled.ColorPalette>
);

export default ColorPalette;
