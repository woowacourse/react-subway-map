import styled from 'styled-components';
import { Flex } from '../../styles';

export const Container = styled.div`
  ${Flex({ justify: 'space-around', items: 'center' })}
  position: fixed;
  width: 550px;
  height: 60px;
  bottom: 0;
  right: 0;
`;

export const ButtonWrapper = styled.div`
  width: 100px;
  height: 40px;
  bottom: 0;
  right: 0;
`;
