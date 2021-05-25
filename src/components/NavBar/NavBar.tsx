import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ROUTE from 'constants/routes';
import logo from 'assets/logo.png';
import Styled from './NavBar.styles';
import PALETTE from 'constants/palette';

const NavBar = () => {
  const selectedNavStyle = {
    backgroundColor: PALETTE.DEFAULT_CREAM,
    borderRadius: '8px',
  };

  return (
    <Styled.Container>
      <Link to={ROUTE.HOME}>
        <Styled.Logo src={logo} />
      </Link>
      <Styled.NavItemList>
        <NavLink to={ROUTE.STATIONS} activeStyle={selectedNavStyle}>
          <Styled.NavItem>역 관리</Styled.NavItem>
        </NavLink>
        <NavLink to={ROUTE.LINES} activeStyle={selectedNavStyle}>
          <Styled.NavItem>노선 관리</Styled.NavItem>
        </NavLink>
        <NavLink to={ROUTE.SECTIONS} activeStyle={selectedNavStyle}>
          <Styled.NavItem>구간 관리</Styled.NavItem>
        </NavLink>
        <NavLink to={ROUTE.LOGIN} activeStyle={selectedNavStyle}>
          <Styled.NavItem>로그인</Styled.NavItem>
        </NavLink>
        <NavLink to={ROUTE.SIGNUP} activeStyle={selectedNavStyle}>
          <Styled.NavItem>회원가입</Styled.NavItem>
        </NavLink>
      </Styled.NavItemList>
    </Styled.Container>
  );
};

export default NavBar;
