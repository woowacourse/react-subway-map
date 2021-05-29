import React from 'react';
import { PropTypes } from 'prop-types';

import { Button, IconPath, IconTrashCan } from '../../components';
import { Item, Content, Detail, Flex, Name, ColorBox, Distance } from './style';

export const SectionListItem = (props) => {
  const { section, onClick } = props;

  return (
    <Item>
      <Content>
        <Flex>
          <Name>{section.name}</Name>
          {section.transferLines?.map((line) => (
            <ColorBox key={line.color} content={line.name[0]} bgColor={line.color}></ColorBox>
          ))}
        </Flex>
        <Button onClick={(e) => onClick(e, section.id)}>
          <IconTrashCan />
        </Button>
      </Content>
      {section.distanceToNextStation > 0 && (
        <Detail>
          <IconPath />
          <Distance>
            <strong>{section.distanceToNextStation}</strong> km
          </Distance>
          <IconPath />
        </Detail>
      )}
    </Item>
  );
};

SectionListItem.propTypes = {
  section: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    distanceToNextStation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    transferLines: PropTypes.array,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
