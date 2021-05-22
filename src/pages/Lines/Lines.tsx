import React, { FC } from 'react';
import Button from '../../components/@common/Button/Button';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Add from '../../components/@common/Icon/Add';
import ListItem from '../../components/@common/ListItem/ListItem';
import { PAGE_INFO, THEME_COLOR } from '../../constants/appInfo';
import { DUMMY_LINES } from '../../constants/dummies';
import PALETTE from '../../constants/palette';
import { AddLineButtonContainer, LineColorDot, LineList } from './Lines.styles';

const Lines: FC = () => {
  return (
    <CardTemplate titleText={PAGE_INFO.LINES.text} templateColor={THEME_COLOR[400]}>
      <AddLineButtonContainer>
        <Button buttonType="round">
          <Add width="80%" color={PALETTE.GRAY[600]} />
        </Button>
      </AddLineButtonContainer>
      {DUMMY_LINES && (
        <LineList>
          {DUMMY_LINES.map((line) => (
            <ListItem key={line.id}>
              <LineColorDot dotColor={line.color} />
              {line.name}
            </ListItem>
          ))}
        </LineList>
      )}
    </CardTemplate>
  );
};

export default Lines;
