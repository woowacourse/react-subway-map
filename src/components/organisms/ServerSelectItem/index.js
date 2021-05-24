import React from 'react';
import { PropTypes } from 'prop-types';

import { ButtonRadio } from '../..';
import { Label, Content, Item, Name, Nickname, Image } from './style';

export const ServerSelectItem = (props) => {
  const { ownerNickname, ownerName, ownerImgSrc, value, ...rest } = props;

  return (
    <Item>
      <Label>
        <ButtonRadio name="serverSelect" value={value} {...rest} />
        <Content>
          <Nickname>{ownerNickname}</Nickname>
          <Name>{ownerName}</Name>
          <Image src={ownerImgSrc} alt={ownerNickname} />
        </Content>
      </Label>
    </Item>
  );
};

ServerSelectItem.propTypes = {
  ownerNickname: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  ownerImgSrc: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
};
