import PropTypes from 'prop-types';
import { COLOR } from '../../../constants';

export const IconTrashCan = (props) => {
  const { width, color, ...rest } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none" {...rest}>
      <path
        d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"
        fill={color}
      />
    </svg>
  );
};

IconTrashCan.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  color: PropTypes.string.isRequired,
};

IconTrashCan.defaultProps = {
  width: 24,
  color: COLOR.ICON_DEFAULT,
};
