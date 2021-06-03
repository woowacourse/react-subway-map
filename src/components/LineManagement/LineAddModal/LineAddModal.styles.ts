import { LineColor } from './../../../types';
import styled, { css } from 'styled-components';
import Container from '../../@common/Container/Container.styles';
import IconButton from '../../@common/IconButton/IconButton';
import Input from '../../@common/Input/Input';
import InputWithAlertText from '../../@mixins/InputWithAlertText/InputWithAlertText';

export const LineAddForm = styled.form`
  width: 100%;
`;

export const StyledInput = styled(Input)`
  margin-bottom: 1.5rem;
`;

export const StyledInputWithAlertText = styled(InputWithAlertText)`
  margin-bottom: 1.5rem;
`;

export const StyledContainer = styled(Container)`
  margin-bottom: 1.5rem;
`;

export const BidirectionArrowIcon = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/icons/bidirection-arrow.svg`,
})`
  margin: 0 1rem;
`;

export const ColorPicker = styled(Container)`
  justify-content: space-evenly;
  width: 100%;
  margin-bottom: 1rem;
`;

const CheckedStyle = css`
  &::after {
    content: 'v';
    font-size: 2rem;
    color: white;
  }
`;

interface ColorSelectButton {
  selectedColor: LineColor;
}

export const ColorSelectButton = styled(IconButton)<ColorSelectButton>`
  border-radius: 50%;
  position: relative;
  width: 1.75rem;
  height: 1.75rem;

  ${({ selectedColor, backgroundColor }) =>
    backgroundColor === selectedColor && CheckedStyle}
`;
