import styled from 'styled-components';
import { Flex } from '../../styles';

export const ButtonWrapper = styled.div`
  width: 50%;
`;

export const Form = styled.form`
  width: 100%;
`;

export const SelectorWrapper = styled.div`
  ${Flex({ justify: 'space-between', items: 'center' })}
  margin-top: 24px;

  & > div {
    width: 40%;
  }

  & > span {
    font-size: var(--size-semi-large);
  }
`;
