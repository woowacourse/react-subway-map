import React from 'react';
import { PropTypes } from 'prop-types';

import { Button, IconTrashCan } from '../..';
import { Item, Name } from './style';

export const StationListItem = (props) => {
  const { station, onClick } = props;

  return (
    <Item>
      <Name>{station.name}</Name>
      <Button onClick={() => onClick(station.id)}>
        <IconTrashCan />
      </Button>
    </Item>
  );
};

StationListItem.propTypes = {
  station: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
