import PropTypes from 'prop-types';
import React from 'react';

import { COLOR } from '../../../../constants';

export const IconCheck = (props) => {
  const { width, color, ...rest } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 16 16" fill="none" {...rest}>
      <path
        d="M5.99998 10.78L3.21998 7.99999L2.27332 8.93999L5.99998 12.6667L14 4.66665L13.06 3.72665L5.99998 10.78Z"
        fill={color}
      />
    </svg>
  );
};

IconCheck.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  color: PropTypes.string.isRequired,
};

IconCheck.defaultProps = {
  width: 16,
  color: COLOR.ICON_DEFAULT,
};
