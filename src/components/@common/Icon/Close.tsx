import PropTypes from 'prop-types';
import React, { VFC } from 'react';
import { Palette } from '../../../constants/palette';

interface Props {
  width?: string;
  color?: string;
}

const Close: VFC<Props> = ({ width = '24px', color = Palette.GRAY_400 }) => {
  return (
    <svg width={width} stroke={color} strokeLinecap="round" strokeWidth={4} viewBox="0 0 40 40">
      <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  );
};

Close.propTypes = {
  width: PropTypes.string,
  color: PropTypes.string,
};

export default Close;
