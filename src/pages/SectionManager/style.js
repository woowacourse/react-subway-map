import styled from 'styled-components';
import { COLOR } from '../../constants';
import { Flex } from '../../styles';

export const ListHeader = styled.div`
  ${Flex({ justify: 'space-between', items: 'center' })}
  width: 100%;
  margin-top: 24px;

  & > *:first-child {
    width: 80%;
  }

  & > *:nth-child(2) {
    width: 15%;
  }
`;

export const Title = styled.span`
  ${Flex({ items: 'center' })}
  padding: 8px;
  background-color: ${({ color }) => color};
  border-radius: 4px;
  color: ${COLOR.WHITE};
  box-shadow: var(--shadow-button);
`;
