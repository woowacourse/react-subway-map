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
        <>
          <Link to={PATH.STATION}>{isLogin && <Button className="mx-1" text="역 관리" />}</Link>
          <Link to={PATH.LINE}>{isLogin && <Button className="mx-1" text="노선 관리" />}</Link>
          <Link to={PATH.SECTION}>{isLogin && <Button className="mx-1" text="구간 관리" />}</Link>
          <Link to={PATH.LOGIN}>
            {isLogin ? (
              <Button onClick={handleLogout} className="mx-1" text="로그아웃" />
            ) : (
              <Button className="mx-1" text="로그인" />
            )}
          </Link>
        </>
      </Header>
      <div className="flex items-center justify-center min-h-full font-jua">{children}</div>
    </div>
  );
};

export default Layout;
