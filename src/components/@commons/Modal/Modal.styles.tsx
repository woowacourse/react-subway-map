import styled from '@emotion/styled';
import { COLOR, SIZE } from '../../../constants/styleConstant';

export const ModalWrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 0.25s ease;
  z-index: 101;
`;

export const ModalInner = styled.div`
  transition: top 0.25s ease;
  min-height: 270px;
  margin: auto;
  overflow: auto;
  background: ${COLOR.WHITE};
  border-radius: 0.5rem;
  max-width: ${SIZE.PAGE_MAX_WIDTH};
  min-width: ${SIZE.PAGE_MIN_WIDTH};
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
