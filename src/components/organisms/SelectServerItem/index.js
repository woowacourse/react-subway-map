import React from 'react';
import { PropTypes } from 'prop-types';

import { ButtonRadio } from '../..';
import { RadioButtonLabel, Content, Item, Name, Nickname, Image } from './style';

export const SelectServerItem = (props) => {
  const { ownerName, ownerNickname, ownerImgSrc, isChecked, value, name, onChange, ...rest } = props;

  return (
    <Item {...rest}>
      <RadioButtonLabel>
        <ButtonRadio isChecked={isChecked} value={value} name={name} onChange={onChange} />
        <Content>
          <Name>{ownerName}</Name>
          <Nickname>{ownerNickname}</Nickname>
          <Image src={ownerImgSrc} alt={ownerNickname} />
        </Content>
      </RadioButtonLabel>
    </Item>
  );
};

SelectServerItem.propTypes = {
  isChecked: PropTypes.bool,
  value: PropTypes.node,
  name: PropTypes.string,
  onChange: PropTypes.func,
};
