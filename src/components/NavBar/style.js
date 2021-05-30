import styled from 'styled-components';
import { Flex } from '../../styles';
import { COLOR } from '../../constants';

export const Container = styled.nav`
  ${Flex({ justify: 'space-between', items: 'center' })}
  background-color: ${COLOR.AMBER};
  width: 100%;
  height: 64px;
  padding: 0 32px;
`;

export const Logo = styled.h1`
  ${Flex({ items: 'center' })}
  font-weight: var(--weight-semi-bold);

  & > img {
    width: 24px;
  }

  & > span {
    margin-left: 8px;
  }
`;

export const List = styled.ul`
  ${Flex({ justify: 'space-around' })}

  & > li {
    width: 96px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin: 0 16px;
    border-radius: 4px;

    & > a {
      width: 100%;
      display: inline-block;
    }

    &:hover {
      background: rgba(153, 153, 153, 0.3);
    }
  }
`;
