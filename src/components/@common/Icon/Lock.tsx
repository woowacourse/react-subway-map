import PropTypes from 'prop-types';
import React, { VFC } from 'react';
import { Palette } from '../../../constants/palette';

interface Props {
  width?: string;
  color?: string;
}

const Lock: VFC<Props> = ({ width = '24px', color = Palette.GRAY_400 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={width}
      fill={color}
    >
      <g fill="none">
        <path d="M0 0h24v24H0V0z" />
        <path d="M0 0h24v24H0V0z" opacity=".87" />
      </g>
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
    </svg>
  );
};

Lock.propTypes = {
  width: PropTypes.string,
  color: PropTypes.string,
};

export default Lock;
