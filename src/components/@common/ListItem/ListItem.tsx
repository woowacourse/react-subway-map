import PropTypes from 'prop-types';
import React, { FC } from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';
import TrashBin from '../Icon/TrashBin';
import { StyledListItem, TrashBinButton } from './ListItem.styles';

interface Props {
  children: React.ReactNode;
}

const ListItem: FC<Props> = ({ children }) => {
  return (
    <StyledListItem>
      <FlexContainer alignItems="center">{children}</FlexContainer>
      <TrashBinButton buttonType="round" isColored={false}>
        <TrashBin width="70%" />
      </TrashBinButton>
    </StyledListItem>
  );
};

ListItem.propTypes = {
  children: PropTypes.node,
};

export default ListItem;
