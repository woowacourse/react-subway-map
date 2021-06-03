import React from 'react';
import { PropTypes } from 'prop-types';

import { Button, IconTrashCan } from '../../components';
import { Item, Name } from './style';

export const StationListItem = (props) => {
  const { station, onClick } = props;

  return (
    <Item>
      <Name>{station.name}</Name>
      <button onClick={(e) => onClick(e, station.id)}>
        <IconTrashCan />
      </button>
    </Item>
  );
};

StationListItem.propTypes = {
  station: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
