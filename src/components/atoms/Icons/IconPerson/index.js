import PropTypes from 'prop-types';
import { COLOR, LAYOUT } from '../../../../constants';

export const IconPerson = (props) => {
  const { width, color, ...rest } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 12 12" fill="none" {...rest}>
      <path
        d="M9.82578 10.2027C10.1022 10.1451 10.2668 9.85585 10.1295 9.60916C9.82667 9.06533 9.34966 8.58745 8.73944 8.22326C7.95354 7.75423 6.99062 7.5 6.00001 7.5C5.00941 7.5 4.04649 7.75423 3.26059 8.22326C2.65037 8.58745 2.17336 9.06533 1.87057 9.60916C1.73322 9.85585 1.89784 10.1451 2.17424 10.2027C4.69765 10.7286 7.30238 10.7286 9.82578 10.2027Z"
        fill={color}
      />
      <circle cx="6" cy="4" r="2.5" fill={color} />
    </svg>
  );
};

IconPerson.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  color: PropTypes.string.isRequired,
};

IconPerson.defaultProps = {
  width: LAYOUT.NAVBAR.ITEM_WIDTH,
  color: COLOR.TEXT.NAVBAR,
};
