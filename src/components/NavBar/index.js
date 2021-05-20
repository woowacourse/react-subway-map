import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../constants';
import { Container, Logo, Menu } from './style';

const routes = [
  { name: '역 관리', path: ROUTE.STATION_MANAGE },
  { name: '노선 관리', path: ROUTE.LINE_MANAGE },
  { name: '구간 관리', path: ROUTE.SECTION_MANAGE },
  { name: '로그인', path: ROUTE.SIGN_IN },
];

const NavBar = () => (
  <Container>
    <Link to={ROUTE.HOME}>
      <Logo>
        <img src="/images/logo_small.png" alt="logo" />
        <span>RUNNING MAP</span>
      </Logo>
    </Link>
    <Menu>
      {routes.map(({ name, path }, index) => (
        <li key={index}>
          <Link to={path}>{name}</Link>
        </li>
      ))}
    </Menu>
  </Container>
);

export default NavBar;
