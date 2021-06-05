import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ButtonType, ButtonWidth } from 'types';
import PALETTE from 'constants/palette';

const buttonStyle = {
  [ButtonType.YELLOW]: css`
    background-color: ${PALETTE.SUBWAY_YELLOW};
    &:hover {
      background-color: #edbd09;
    }
  `,
  [ButtonType.GREEN]: css`
    color: ${PALETTE.DEFAULT_WHITE};
    background-color: ${PALETTE.SUBWAY_GREEN};
    &:hover {
      background-color: ${PALETTE.SUBWAY_YELLOW};
      color: ${PALETTE.DEFAULT_BLACK};
    }
  `,
  [ButtonType.BLANK]: css`
    background-color: ${PALETTE.DEFAULT_WHITE};
    &:hover {
      background-color: #ededed;
    }
  `,
  [ButtonType.TRANSPARENT]: css`
    background-color: transparent;
    border: none;
    box-shadow: none;

    &:hover {
      transform: scale(1.1);
    }
  `,
};

const buttonWidth = {
  [ButtonWidth.AUTO]: css`
    width: auto;
  `,
  [ButtonWidth.FULL]: css`
    width: 100%;
  `,
};

interface ContainerProps {
  styleType: ButtonType;
  widthType: ButtonWidth;
  isSelected?: boolean;
}

const Container = styled.button<ContainerProps>`
  height: 44px;
  padding: 0 18px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 44px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  ${({ styleType }) => buttonStyle[styleType]};
  ${({ widthType }) => buttonWidth[widthType]};

  background-color: ${({ isSelected }) => isSelected && PALETTE.SUBWAY_YELLOW};
  color: ${({ isSelected }) => isSelected && PALETTE.DEFAULT_BLACK};
`;

export default { Container };
