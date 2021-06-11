import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import ROUTES from '../../constants/routes';
import * as Styled from './Navbar.styles';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const location = useLocation();
  const { isLogin, onLogout } = useAuth();

  return (
    <Styled.Navbar>
      <Styled.NavList>
        {isLogin && (
          <>
            <Styled.NavItem>
              <Link to={ROUTES.STATION}>
                <Button variant="text" active={location.pathname === ROUTES.STATION}>
                  역 관리
                </Button>
              </Link>
            </Styled.NavItem>
            <Styled.NavItem>
              <Link to={ROUTES.LINE}>
                <Button variant="text" active={location.pathname === ROUTES.LINE}>
                  노선 관리
                </Button>
              </Link>
            </Styled.NavItem>
            <Styled.NavItem>
              <Link to={ROUTES.SECTION}>
                <Button variant="text" active={location.pathname === ROUTES.SECTION}>
                  구간 관리
                </Button>
              </Link>
            </Styled.NavItem>
          </>
        )}
        <Styled.NavItem>
          <Link to={ROUTES.MAP}>
            <Button variant="text" active={location.pathname === ROUTES.MAP}>
              전체 보기
            </Button>
          </Link>
        </Styled.NavItem>

        <Styled.NavItem>
          {isLogin ? (
            <Button variant="text" active={location.pathname === ROUTES.ROOT} onClick={onLogout}>
              로그아웃
            </Button>
          ) : (
            <Link to={ROUTES.ROOT}>
              <Button variant="text" active={location.pathname === ROUTES.ROOT}>
                로그인
              </Button>
            </Link>
          )}
        </Styled.NavItem>
      </Styled.NavList>
    </Styled.Navbar>
  );
};

export default Navbar;
