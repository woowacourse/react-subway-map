import styled from '@emotion/styled';
import { PALETTE } from '../../../constants';

const Dimmer = styled.div<{ isOpen: boolean }>`
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  transition: opacity 0.25s ease;
  z-index: 999;
`;

const Container = styled.div`
  background-color: ${PALETTE.DEFAULT_WHITE};
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  width: 560px;
  min-height: 480px;
  padding: 3.2rem 2.8rem;
  box-sizing: border-box;
  z-index: 1;
  border: 1px solid ${PALETTE.DEFAULT_WHITE};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2``;

export default { Dimmer, Container, Title };
