import styled from "styled-components";

import { Z_INDEX } from "../../utils/constants/size";

interface ContainerProps {
  opacity: number;
}

const ModalBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dimmed = styled.div<ContainerProps>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  opacity: ${({ opacity }) => opacity};
  transition: opacity 0.5s;
`;

const Contents = styled.div`
  z-index: ${Z_INDEX.MODAL};
`;

export { ModalBlock, Dimmed, Contents };
