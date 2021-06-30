import PropTypes from 'prop-types';
import React from 'react';
import PALETTE from '../../../constants/palette';

interface Props {
  width?: string;
  color?: string;
}

const Arrow = ({ width = '24px', color = PALETTE.GRAY[400] }: Props): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={width}
      fill={color}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
    </svg>
  );
};

Arrow.propTypes = {
  width: PropTypes.string,
  color: PropTypes.string,
};

export default Arrow;
