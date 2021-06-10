import PropTypes from 'prop-types';
import { COLOR, LAYOUT } from '../../../../constants';

export const IconSearch = (props) => {
  const { width, color, ...rest } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 12 12" fill="none" {...rest}>
      <path
        d="M9.33849 9.80345L6.48099 6.94545C5.20983 7.84918 3.45821 7.62812 2.45143 6.43691C1.44464 5.2457 1.51857 3.48174 2.62149 2.37895C3.72412 1.27567 5.48825 1.20143 6.67969 2.20816C7.87112 3.21489 8.0923 4.96667 7.18849 6.23795L10.046 9.09595L9.33899 9.80295L9.33849 9.80345ZM4.74249 2.49994C3.79434 2.49973 2.97634 3.16529 2.78373 4.09367C2.59112 5.02205 3.07685 5.95809 3.94683 6.33507C4.81681 6.71205 5.83194 6.42636 6.37761 5.65097C6.92328 4.87559 6.84953 3.82361 6.20099 3.13195L6.50349 3.43195L6.16249 3.09195L6.15649 3.08595C5.78238 2.70954 5.27319 2.49851 4.74249 2.49994Z"
        fill={color}
      />
    </svg>
  );
};

IconSearch.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  color: PropTypes.string.isRequired,
};

IconSearch.defaultProps = {
  width: LAYOUT.NAVBAR.ITEM_WIDTH,
  color: COLOR.TEXT.NAVBAR,
};
