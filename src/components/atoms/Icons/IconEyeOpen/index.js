import PropTypes from 'prop-types';
import { COLOR } from '../../../../constants';

export const IconEyeOpen = (props) => {
  const { width, color, ...rest } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 16 16" fill="none" {...rest}>
      <circle cx="8.00004" cy="7.99998" r="2.16667" stroke={color} />
      <path
        d="M13.1679 6.94822C13.5638 7.39757 13.7618 7.62225 13.7618 8C13.7618 8.37775 13.5638 8.60243 13.1679 9.05178C12.1235 10.2369 10.2 12 8 12C5.8 12 3.87655 10.2369 2.83215 9.05178C2.43615 8.60243 2.23816 8.37775 2.23816 8C2.23816 7.62225 2.43615 7.39757 2.83215 6.94822C3.87655 5.7631 5.8 4 8 4C10.2 4 12.1235 5.7631 13.1679 6.94822Z"
        stroke={color}
      />
    </svg>
  );
};

IconEyeOpen.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  color: PropTypes.string.isRequired,
};

IconEyeOpen.defaultProps = {
  width: 16,
  color: COLOR.ICON_DEFAULT,
};
