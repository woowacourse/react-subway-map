import styled from 'styled-components';
import { Flex } from '../../styles';

export const Form = styled.form`
  ${Flex({ justify: 'space-between', items: 'flex-end' })}
  width:100%;
`;

export const InputWrapper = styled.div`
  width: 80%;
`;

export const ButtonWrapper = styled.div`
  width: 15%;
`;
