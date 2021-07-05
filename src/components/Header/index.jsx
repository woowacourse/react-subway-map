import React from "react";
import { Link } from "react-router-dom";
import PATH from "../../constants/path";
import { useAuth } from "../../pages/Login/hooks";
import NavLink from "../@shared/NavLink";
import runningmapLogo from "../../assets/runningmap-logo.png";

const Header = () => {
  const isAuthenticated = useAuth();

  return (
    <header className="px-8 py-4 text-gray-800 text-2xl font-medium bg-yellow-300">
      <div className="flex items-center justify-between mx-auto max-w-screen-lg">
        <h1>
          <Link to="/">
            <img src={runningmapLogo} alt="러닝맵 로고" className="w-52" />
          </Link>
        </h1>
        <ul className="flex text-lg space-x-6">
          <li>
            <NavLink to={PATH.STATIONS}>역 관리</NavLink>
          </li>
          <li>
            <NavLink to={PATH.LINES}>노선 관리</NavLink>
          </li>
          <li>
            <NavLink to={PATH.SECTIONS}>구간 관리</NavLink>
          </li>
          <li>
            <NavLink to={PATH.OVERVIEW}>전체 보기</NavLink>
          </li>
          <li>
            {isAuthenticated ? (
              <NavLink to={PATH.LOGOUT}>로그아웃</NavLink>
            ) : (
              <NavLink to={PATH.LOGIN}>로그인</NavLink>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
