import styled from 'styled-components';
import { Flex } from '../../styles';

export const Container = styled.div`
  ${Flex({ direction: 'column', justify: 'flex-end', items: 'center' })}
  width: 100%;
  margin-top: 30px;

  & > span {
    margin-bottom: 5px;
  }
`;

export const ButtonWrapper = styled.div`
  ${Flex({ justify: 'space-evenly' })}
  width: 100%;
  margin-top: 10px;
  & > div {
    width: 30%;
  }
`;
