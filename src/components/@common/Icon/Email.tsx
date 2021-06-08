import React, { VFC } from 'react';
import { Palette } from '../../../constants/palette';

interface Props {
  size?: string;
  color?: string;
}

const Email: VFC<Props> = ({ size = '24px', color = Palette.GRAY_400 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
    </svg>
  );
};

export default Email;
