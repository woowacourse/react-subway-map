import { PropTypes } from 'prop-types';
import React from 'react';

import { CheckMark, Container, Item, Label, LabelText, List, RadioButton } from './style';

export const ColorPicker = (props) => {
  const { label, colors, ...rest } = props;

  return (
    <Container>
      {label && <LabelText>{label}</LabelText>}
      <List>
        {colors.map((color) => (
          <Item key={color} color={color}>
            <Label>
              <RadioButton type="radio" name="color" value={color} {...rest} />
              <CheckMark width="1.5rem" color="#fff" />
            </Label>
          </Item>
        ))}
      </List>
    </Container>
  );
};

ColorPicker.propTypes = {
  label: PropTypes.node,
  colors: PropTypes.array.isRequired,
};
