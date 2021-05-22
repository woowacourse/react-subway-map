import styled from 'styled-components';
import { Flex } from '../../../styles';

export const Form = styled.form`
  width: 100%;
`;

export const SelectorWrapper = styled.div`
  ${Flex({ justify: 'space-between', items: 'center' })}

  & > div {
    width: 40%;
  }

  & > span {
    margin-top: 24px;
    font-size: var(--size-semi-large);
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 24px;
`;
