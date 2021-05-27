import React from 'react';
import { PropTypes } from 'prop-types';

import { Button, IconArrowLTR, IconTrashCan } from '../../components';
import { Item, Name, ColorBox, StationsDetail, StationName, Flex, TotalDistance } from './style';

export const LineListItem = (props) => {
  const { line, onClick } = props;

  return (
    <Item>
      <ColorBox bgColor={line.color}></ColorBox>
      <Name>{line.name}</Name>
      <StationsDetail>
        <StationName>{line.startStation.name}</StationName>
        <Flex>
          <TotalDistance>
            <strong>{line.distance}</strong>km
          </TotalDistance>
          <IconArrowLTR width={30} />
        </Flex>
        <StationName>{line.endStation.name}</StationName>
      </StationsDetail>
      <Button onClick={(e) => onClick(e, line.id)}>
        <IconTrashCan />
      </Button>
    </Item>
  );
};

LineListItem.propTypes = {
  line: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    distance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    startStation: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    }),
    endStation: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    }),
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
