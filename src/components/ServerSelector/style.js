import styled from 'styled-components';
import { Flex } from '../../styles';

export const Container = styled.div`
  ${Flex({
    direction: 'column',
    justify: 'space-around',
    items: 'center',
  })}
  position: fixed;
  width: 120px;
  height: 280px;
  bottom: 0;
  right: 0;
`;

export const ButtonWrapper = styled.div`
  width: 100px;
  height: 40px;
  bottom: 0;
  right: 0;
`;
