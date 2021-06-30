import React from 'react';
import headerImg from 'assets/images/nanny.png';
import { Link } from 'react-router-dom';
import PATH from 'constants/path';
import { logout } from 'redux/authSlice';
import { useDispatch } from 'react-redux';

interface HeaderProps {
  isLogin: boolean;
}

const Header = ({ isLogin }: HeaderProps) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="flex items-center justify-between mb-10 p-4 w-full bg-red-300">
      <Link to={PATH.HOME}>
        <div className="flex items-center">
          <img alt="headerImg" className="w-16" src={headerImg} />
          <h1 className="font-staatliches -ml-2 text-3xl font-bold">Yum0 Map</h1>
        </div>
      </Link>
      <nav className="font-jua">
        {isLogin && (
          <>
            <Link className="mx-6" to={PATH.STATION}>
              역 관리
            </Link>
            <Link className="mx-6" to={PATH.LINE}>
              노선 관리
            </Link>
            <Link className="mx-6" to={PATH.SECTION}>
              구간 관리
            </Link>
            <button className="mx-6 focus:outline-none" type="button" onClick={onLogout}>
              로그아웃
            </button>
          </>
        )}
        {!isLogin && (
          <Link className="mx-6" to={PATH.LOGIN}>
            로그인
          </Link>
        )}
      </nav>
    </header>
  );
};

Header.defaultProps = {};

export default Header;
