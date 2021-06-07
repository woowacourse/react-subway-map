import React from 'react';
import * as Styled from './ColorPalette.styles';
import { Color } from '../../types';

interface IProps {
  onClick: (color: Color) => void;
  disabledColors?: Color[];
}

const ColorPalette = ({ onClick, disabledColors }: IProps) => (
  <Styled.ColorPalette>
    {Object.values(Color).map((color) => (
      <Styled.Button
        key={color}
        disabled={disabledColors?.includes(color)}
        onClick={() => onClick(color)}
        type="button"
        color={color}
      />
    ))}
  </Styled.ColorPalette>
);

export default ColorPalette;
