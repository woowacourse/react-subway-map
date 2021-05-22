import styled, { css } from 'styled-components';
import { COLOR } from '../../constants';
import { Flex } from '../../styles';

export const Container = styled.div`
  & > span {
    position: relative;
    top: 10px;
    left: 10px;
    background-color: ${COLOR.WHITE};
    color: ${COLOR.GRAY_300};
    font-size: var(--size-small);
  }
`;

export const Palette = styled.ul`
  padding: 12px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px 0;
  border: 1px solid ${COLOR.GRAY_500};
  border-radius: 4px;
`;

export const ColorWrapper = styled.li`
  ${Flex({ justify: 'center', items: 'center' })}
`;

export const Color = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  ${({ isPicked }) =>
    isPicked &&
    css`
      width: 50px;
      height: 50px;
      border: 3px solid white;
    `};
  background-color: ${({ color }) => color};
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;
