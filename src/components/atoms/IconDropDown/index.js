import PropTypes from 'prop-types';
import { COLOR } from '../../../constants';

export const IconDropDown = (props) => {
  const { width, color, ...rest } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 20 20" fill="none" {...rest}>
      <path
        d="M9.80799 12.2695L6.92683 8.81215C6.49261 8.29109 6.86314 7.5 7.54141 7.5L12.4587 7.5C13.1369 7.5 13.5075 8.29109 13.0733 8.81215L10.1921 12.2695C10.0921 12.3895 9.90794 12.3895 9.80799 12.2695Z"
        fill={color}
      />
    </svg>
  );
};

IconDropDown.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  color: PropTypes.string.isRequired,
};

IconDropDown.defaultProps = {
  width: 20,
  color: COLOR.ICON_DEFAULT,
};
