import styled from 'styled-components';
import { COLOR } from '../../constants';
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

export const Validator = styled.span`
  display: inline-block;
  width: 100%;
  padding-left: 8px;
  font-size: var(--size-small);
  color: ${COLOR.RED};
`;
