import React, { VFC } from 'react';
import { Palette } from '../../../constants/palette';

interface Props {
  size?: string;
  color?: string;
}

const Arrow: VFC<Props> = ({ size = '24px', color = Palette.GRAY_400 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
    </svg>
  );
};

export default Arrow;
