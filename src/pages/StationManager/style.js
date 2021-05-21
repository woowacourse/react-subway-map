import styled from 'styled-components';
import { Flex } from '../../styles';

export const Content = styled.div`
  ${Flex({ direction: 'column', items: 'center' })}
  padding: 12px 48px 36px 48px;
`;

export const Form = styled.form`
  ${Flex({ justify: 'space-between', items: 'flex-end' })}
  width: 540px;
  margin-bottom: 36px;
`;

export const InputWrapper = styled.div`
  width: 80%;
`;

export const ButtonWrapper = styled.div`
  width: 15%;
`;
