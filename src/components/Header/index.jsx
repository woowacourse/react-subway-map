import React from "react";
import { Link } from "react-router-dom";
import NavLink from "../NavLink";

const Header = () => (
  <header className="px-8 py-4 text-gray-800 text-2xl font-medium bg-yellow-300">
    <div className="flex justify-between mx-auto max-w-screen-lg">
      <h1>
        <Link to="/">러닝맵 로고</Link>
      </h1>
      <ul className="flex text-lg space-x-6">
        <li>
          <NavLink to="/stations">역 관리</NavLink>
        </li>
        <li>
          <NavLink to="/lines">노선 관리</NavLink>
        </li>
        <li>
          <NavLink to="/sections">구간 관리</NavLink>
        </li>
        <li>
          <NavLink to="/overview">경로 검색</NavLink>
        </li>
        <li>
          <NavLink to="/login">로그인</NavLink>
        </li>
      </ul>
    </div>
  </header>
);

export default Header;
