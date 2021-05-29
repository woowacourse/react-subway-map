import styled from '@emotion/styled';
import { COLOR, SIZE } from '../../../constants/styleConstant';

export const Navigation = styled.nav`
  z-index: 100;
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.primaryColor};
  position: fixed;
  top: 0;
  left: 0;
`;

export const Main = styled.div`
  width: 100%;
  max-width: ${SIZE.PAGE_MAX_WIDTH};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  a {
    cursor: pointer;
    color: ${COLOR.WHITE};
  }
`;

export const Menu = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 100%;
`;

export const MenuItem = styled.li`
  height: 100%;
  width: 5.5rem;
  margin: 0;
  padding: 0;
  margin-left: 1rem;
  font-size: 1.25rem;
  padding: 0.25rem;

  a {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: ${COLOR.WHITE};
  }
  &:hover {
    border-bottom: 0.5rem solid ${({ theme }) => theme.secondaryColor};
  }
`;
