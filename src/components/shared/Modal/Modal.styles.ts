import styled from '@emotion/styled';

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
  background-color: #fdfdfd;
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
  border: 1px solid #dddddd;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.div`
  margin: 5px;
  width: 30px;
  position: absolute;
  right: 3px;
  top: 3px;
  cursor: pointer;
  background: none;
  border: none;

  svg {
    display: block;
    pointer-events: none;

    path {
      stroke: gray;
      fill: transparent;
      stroke-linecap: round;
      stroke-width: 2;
      pointer-events: none;
    }
  }
`;

const Title = styled.h2``;

export default { Dimmer, Container, CloseButton, Title };
