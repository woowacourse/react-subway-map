import React from 'react';
import { Link } from 'react-router-dom';
import ROUTE from 'constants/routes';
import logo from 'assets/logo.png';
import Styled from './NavBar.styles';

const NavBar = () => {
  return (
    <Styled.Container>
      <Link to={ROUTE.HOME}>
        <Styled.Logo src={logo} />
      </Link>
      <Styled.NavItemList>
        <Link to={ROUTE.STATIONS}>
          <Styled.NavItem>역 관리</Styled.NavItem>
        </Link>
        <Link to={ROUTE.LINES}>
          <Styled.NavItem>노선 관리</Styled.NavItem>
        </Link>
        <Link to={ROUTE.SECTIONS}>
          <Styled.NavItem>구간 관리</Styled.NavItem>
        </Link>
        <Link to="/login">
          <Styled.NavItem>로그인</Styled.NavItem>
        </Link>
      </Styled.NavItemList>
    </Styled.Container>
  );
};

export default NavBar;
