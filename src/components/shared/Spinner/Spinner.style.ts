import styled, { css, keyframes } from 'styled-components';
import { Properties } from 'csstype';

import PALETTE from '../../../constants/palette';
import Z_INDEX from '../../../constants/zIndex';

const spin = keyframes`
  from {
    transform: rotate(0);
  } to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Z_INDEX.MIDDLE};

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${PALETTE.WHITE};

  :before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: ${Z_INDEX.MIDDLE - 1};

    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const Loader = styled.div<Properties>`
  width: 5rem;
  height: 5rem;
  background-color: transparent;
  border-radius: 50%;
  z-index: ${Z_INDEX.MIDDLE + 1};

  border: 0.75rem solid ${({ borderColor }) => borderColor};
  border-bottom: 0.75rem solid transparent;

  animation: ${css`
    ${spin} 1s infinite
  `};
`;

export { Container, Loader };
