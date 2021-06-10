import PropTypes from 'prop-types';
import { COLOR } from '../../../../constants';

export const IconArrowLTR = (props) => {
  const { width, color, ...rest } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 20 8" fill="none" {...rest}>
      <path d="M16 0V3H0V5H16V8L20 4L16 0Z" fill={color} />
    </svg>
  );
};

IconArrowLTR.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  color: PropTypes.string.isRequired,
};

IconArrowLTR.defaultProps = {
  width: 20,
  color: COLOR.ICON_DEFAULT,
};
