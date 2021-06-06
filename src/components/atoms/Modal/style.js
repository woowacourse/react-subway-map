import styled from 'styled-components';
import { Z_INDEX } from '../../../constants';

export const ModalContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Z_INDEX.MODAL};
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.25s ease;
`;

export const ModalInner = styled.div`
  position: relative;
  overflow: auto;
  min-width: 30rem;
  border-radius: 0.3125rem;
  transition: top 0.25s ease;

  @media screen and (max-width: 768px) {
    .modal-inner {
      width: 90%;
      height: 90%;
      box-sizing: border-box;
    }
  }
`;
