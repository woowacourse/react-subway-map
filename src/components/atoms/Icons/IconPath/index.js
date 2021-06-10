import PropTypes from 'prop-types';
import { COLOR } from '../../../../constants';

export const IconPath = (props) => {
  const { width, color, ...rest } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 1 12" fill="none" {...rest}>
      <line x1="0.5" y1="2.18557e-08" x2="0.5" y2="3" stroke={color} />
      <line x1="0.5" y1="4.5" x2="0.5" y2="7.5" stroke={color} />
      <line x1="0.5" y1="9" x2="0.5" y2="12" stroke={color} />
    </svg>
  );
};

IconPath.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  color: PropTypes.string.isRequired,
};

IconPath.defaultProps = {
  width: 1,
  color: COLOR.ICON_DEFAULT,
};
