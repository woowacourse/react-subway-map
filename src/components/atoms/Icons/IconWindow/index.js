import PropTypes from 'prop-types';
import React from 'react';

import { COLOR, LAYOUT } from '../../../../constants';

export const IconWindow = (props) => {
  const { width, color, ...rest } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 12 12" fill="none" {...rest}>
      <path
        d="M9.5 2H2.5C1.945 2 1.5 2.45 1.5 3V9C1.5 9.55 1.945 10 2.5 10H9.5C10.05 10 10.5 9.55 10.5 9V3C10.5 2.45 10.055 2 9.5 2ZM9.5 9H2.5V4H9.5V9Z"
        fill={color}
      />
    </svg>
  );
};

IconWindow.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  color: PropTypes.string.isRequired,
};

IconWindow.defaultProps = {
  width: LAYOUT.NAVBAR.ITEM_WIDTH,
  color: COLOR.TEXT.NAVBAR,
};
