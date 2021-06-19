import { PropTypes } from 'prop-types';
import React from 'react';

import { Button, IconPath, IconTrashCan } from '../../components';
import { ColorBox, Content, Detail, Distance, Flex, Item, Name } from './style';

export const SectionListItem = (props) => {
  const { currentLineName, color, section, onClick } = props;

  return (
    <Item>
      <Content>
        <Flex>
          <Name>{section.name}</Name>
          <ColorBox bgColor={color}>
            <span>{currentLineName[0]}</span>
          </ColorBox>
          {section.transferLines?.map((line) => (
            <ColorBox key={line.color} bgColor={line.color}>
              <span>{line.name[0]}</span>
            </ColorBox>
          ))}
        </Flex>

        <Button onClick={() => onClick(section.id)}>
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
  currentLineName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  section: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    distanceToNextStation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    transferLines: PropTypes.array,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
