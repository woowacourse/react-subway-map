import styled from 'styled-components';
import { Flex } from '../../../styles';
import { COLOR } from '../../../constants';

export const Container = styled.div`
  ${Flex({ direction: 'column', justify: 'center', items: 'center' })}
  border-radius: 0 0 4px 4px;
  box-shadow: var(--shadow-page);

  &::before {
    content: '';
    background-color: ${COLOR.AMBER};
    width: 100%;
    height: 8px;
    border-radius: 4px 4px 0 0;
  }
`;

export const Title = styled.h2`
  margin: 24px 0;
  color: ${COLOR.GRAY_500};
`;
