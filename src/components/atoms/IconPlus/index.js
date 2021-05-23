import PropTypes from 'prop-types';
import { COLOR } from '../../../constants';

export const IconPlus = (props) => {
  const { width, color, ...rest } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 20 20" fill="none" {...rest}>
      <path
        d="M15.8333 10.8333H10.8333V15.8333H9.16663V10.8333H4.16663V9.16666H9.16663V4.16666H10.8333V9.16666H15.8333V10.8333Z"
        fill={color}
      />
    </svg>
  );
};

IconPlus.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  color: PropTypes.string.isRequired,
};

IconPlus.defaultProps = {
  width: 20,
  color: COLOR.ICON_DEFAULT,
};
