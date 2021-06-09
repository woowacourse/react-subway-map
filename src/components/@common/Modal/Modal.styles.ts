import styled, { css } from 'styled-components';
import { ModalSize } from '../../../types';
import Container from '../Container/Container.styles';
import { Z_INDEX } from './../../../constants/styles';

export const ModalOuterContainer = styled(Container)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: ${Z_INDEX.MODAL};
`;

interface ModalInnerContainerProps {
  size: ModalSize;
}

const SmallStyle = css`
  width: 20rem;
`;

const MediumStyle = css`
  width: 30rem;
`;

const LargeStyle = css`
  width: 40rem;
`;

const sizeMap = {
  small: SmallStyle,
  medium: MediumStyle,
  large: LargeStyle,
};

export const ModalInnerContainer = styled(Container)<ModalInnerContainerProps>`
  background: white;
  padding: 3rem;
  border-radius: 0.75rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ size }) => sizeMap[size]}
`;
