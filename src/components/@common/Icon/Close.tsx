import React, { VFC } from 'react';
import { Palette } from '../../../constants/palette';

interface Props {
  size?: string;
  color?: string;
}

const Close: VFC<Props> = ({ size = '24px', color = Palette.GRAY_400 }) => {
  return (
    <svg width={size} stroke={color} strokeLinecap="round" strokeWidth={4} viewBox="0 0 40 40">
      <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  );
};

export default Close;
