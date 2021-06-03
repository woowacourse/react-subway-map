import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import ROUTE from 'constants/routes';
import PALETTE from 'constants/palette';
import logo from 'assets/logo.png';
import Styled from './NavBar.styles';
import { useAppDispatch, useAppSelector } from 'modules/hooks';
import { logout as logoutAction } from 'modules/authSlice';
import { resetServer } from 'modules/serverSlice';
import { User } from 'types';

const NavBar = () => {
  const history = useHistory();
  const user: User | undefined = useAppSelector((state) => state.authSlice.data);
  const dispatch = useAppDispatch();

  const selectedNavStyle = {
    backgroundColor: PALETTE.DEFAULT_CREAM,
    borderRadius: '8px',
  };

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('server');

    dispatch(logoutAction());
    dispatch(resetServer());

    history.push(ROUTE.LOGIN);
  };

  return (
    <Styled.Container>
      <Link to={ROUTE.HOME}>
        <Styled.Logo src={logo} />
      </Link>
      <Styled.NavItemList>
        {user ? (
          <>
            <NavLink to={ROUTE.STATIONS} activeStyle={selectedNavStyle}>
              <Styled.NavItem>역 관리</Styled.NavItem>
            </NavLink>
            <NavLink to={ROUTE.LINES} activeStyle={selectedNavStyle}>
              <Styled.NavItem>노선 관리</Styled.NavItem>
            </NavLink>
            <NavLink to={ROUTE.SECTIONS} activeStyle={selectedNavStyle}>
              <Styled.NavItem>구간 관리</Styled.NavItem>
            </NavLink>
            <NavLink to={ROUTE.SEARCH} activeStyle={selectedNavStyle}>
              <Styled.NavItem>경로검색</Styled.NavItem>
            </NavLink>
            <NavLink to={ROUTE.MAP} activeStyle={selectedNavStyle}>
              <Styled.NavItem>전체보기</Styled.NavItem>
            </NavLink>
            <Styled.NavItem onClick={logout}>로그아웃</Styled.NavItem>
          </>
        ) : (
          <>
            <NavLink to={ROUTE.LOGIN} activeStyle={selectedNavStyle}>
              <Styled.NavItem>로그인</Styled.NavItem>
            </NavLink>
            <NavLink to={ROUTE.SIGNUP} activeStyle={selectedNavStyle}>
              <Styled.NavItem>회원가입</Styled.NavItem>
            </NavLink>
          </>
        )}
      </Styled.NavItemList>
    </Styled.Container>
  );
};

export default NavBar;
