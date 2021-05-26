import styled from '@emotion/styled';
import { FlexCenterBox } from '../../../styles/css';

const Dimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const Container = styled.div`
  background-color: #fdfdfd;
  border-radius: 5px;
  position: relative;
  top: 150px;
  left: 0;
  margin: 0 auto;
  width: fit-content;
  padding: 34px;
  z-index: 1;
  border: 1px solid #dddddd;
  flex-direction: column;
  ${FlexCenterBox};
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

export { Dimmer, Container, CloseButton };
