import Button from '@shared/Button/Button';
import Header from '@units/Header/Header';
import PATH from 'constants/PATH';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from 'redux/authSlice';

interface BaseLayoutProps {
  children: React.ReactNode;
  isLogin: boolean;
}

const Layout = ({ children, isLogin }: BaseLayoutProps) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Header>
        <Link to={PATH.STATION}>
          {isLogin && (
            <Button className="mx-1">
              <span>역 관리</span>
            </Button>
          )}
        </Link>
        <Link to={PATH.LINE}>
          {isLogin && (
            <Button className="mx-1">
              <span>노선 관리</span>
            </Button>
          )}
        </Link>
        <Link to={PATH.SECTION}>
          {isLogin && (
            <Button className="mx-1">
              <span>구간 관리</span>
            </Button>
          )}
        </Link>
        <Link to={PATH.MAP}>
          <Button className="mx-1">
            <span>전체 보기</span>
          </Button>
        </Link>
        <Link to={PATH.LOGIN}>
          {isLogin ? (
            <Button onClick={handleLogout} className="mx-1">
              <span>로그아웃</span>
            </Button>
          ) : (
            <Button onClick={handleLogout} className="mx-1">
              <span>로그인</span>
            </Button>
          )}
        </Link>
      </Header>
      <div className="flex items-center justify-center min-h-full font-jua">{children}</div>
    </div>
  );
};

export default Layout;
