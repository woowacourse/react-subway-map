import styled from 'styled-components';
import { COLOR } from '../../../constants';
import { Flex } from '../../../styles';

export const Dimmer = styled.div`
  ${Flex({ justify: 'center', items: 'center' })}
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  width: 480px;
  position: relative;
  background-color: ${COLOR.WHITE};
  border-radius: 4px;

  & > button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: var(--size-regular);
  }
`;
