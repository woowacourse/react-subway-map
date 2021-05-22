import React from 'react';
import { PropTypes } from 'prop-types';

import { ButtonRadio } from '../..';
import { Label, Content, Item, Name, Nickname, Image } from './style';

export const ServerSelectItem = (props) => {
  const { ownerName, ownerNickname, ownerImgSrc, isChecked, value, name, onChange, ...rest } = props;

  return (
    <Item {...rest}>
      <Label>
        <ButtonRadio isChecked={isChecked} value={value} name={name} onChange={onChange} />
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
  isChecked: PropTypes.bool,
  value: PropTypes.node,
  name: PropTypes.string,
  onChange: PropTypes.func,
};
