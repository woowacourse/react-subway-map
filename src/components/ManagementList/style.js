import styled from 'styled-components';
import { COLOR } from '../../constants';
import { Flex } from '../../styles';

export const Container = styled.ul`
  ${Flex({ direction: 'column' })}
  width: 100%;
  max-height: 300px;
  border: 1px solid ${COLOR.GRAY_100};
  border-radius: 4px;
  overflow: auto;

  & > li {
    ${Flex({ justify: 'space-between' })}
    padding: 16px;
    border-bottom: 1px solid ${COLOR.GRAY_100};

    & > button {
      font-size: var(--size-regular);
    }
  }
`;
