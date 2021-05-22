import styled from 'styled-components';
import { COLOR } from '../../../constants';
import { Flex } from '../../../styles';

export const LineName = styled.div`
  ${Flex({ items: 'center' })};
  width: 100%;
  height: 50px;
  padding: 8px;
  border-radius: 4px;
  color: ${COLOR.WHITE};
  background-color: ${({ color }) => color};
`;

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
