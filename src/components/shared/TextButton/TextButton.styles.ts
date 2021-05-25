import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ButtonType, ButtonSize } from 'types';
import PALETTE from 'constants/palette';

const buttonStyle = {
  [ButtonType.FILLED]: css`
    background-color: ${PALETTE.SUBWAY_YELLOW};
    &:hover {
      background-color: #edbd09;
    }
  `,
  [ButtonType.BLANK]: css`
    background-color: ${PALETTE.DEFAULT_WHITE};
    &:hover {
      background-color: #ededed;
    }
  `,
};

const buttonSize = {
  [ButtonSize.LARGE]: css`
    width: 100%;
  `,
  [ButtonSize.SMALL]: css`
    width: auto;
  `,
};

interface ContainerProps {
  styleType: ButtonType;
  sizeType: ButtonSize;
}

const Container = styled.button<ContainerProps>`
  height: 44px;
  padding: 0 18px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  ${({ styleType }) => buttonStyle[styleType]};
  ${({ sizeType }) => buttonSize[sizeType]};
`;

export default { Container };
