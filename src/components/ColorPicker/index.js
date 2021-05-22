import React from 'react';
import PropTypes from 'prop-types';
import { LINE_COLOR } from '../../constants';
import { Color, ColorWrapper, Container, Palette } from './style';

const colors = Object.values(LINE_COLOR);

const ColorItem = ({ color, isPicked, onClickColor }) => (
  <ColorWrapper>
    <Color color={color} isPicked={isPicked} onClick={onClickColor} />
  </ColorWrapper>
);

const ColorPicker = ({ pickedColor, onClickColor }) => (
  <Container>
    <span>노선 색상</span>
    <Palette>
      {colors.map((color, index) => (
        <ColorItem
          key={index}
          color={color}
          isPicked={pickedColor === color}
          onClickColor={() => onClickColor(color)}
        />
      ))}
    </Palette>
  </Container>
);

ColorPicker.propType = {
  pickedColor: PropTypes.string.isRequired,
  onClickColor: PropTypes.func.isRequired,
};

export default ColorPicker;
