import PropTypes from 'prop-types';
import React from 'react';
import PALETTE from '../../../constants/palette';

interface Props {
  width?: string;
  color?: string;
}

const Add = ({ width = '24px', color = PALETTE.GRAY[400] }: Props): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={width}
      fill={color}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  );
};

Add.propTypes = {
  width: PropTypes.string,
  color: PropTypes.string,
};

export default Add;
