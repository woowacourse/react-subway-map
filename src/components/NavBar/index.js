import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, ConfirmModal } from '..';
import { ROUTE } from '../../constants';
import { useModal } from '../../hooks';
import { Container, Logo, List } from './style';

const publicRoutes = [ROUTE.MAP, ROUTE.SIGN_IN];

const privateRoutes = [
  ROUTE.STATION_MANAGE,
  ROUTE.LINE_MANAGE,
  ROUTE.SECTION_MANAGE,
  ROUTE.MAP,
  ROUTE.SIGN_OUT,
];

const Menu = ({ openModal }) => {
  const { token } = useSelector(({ user }) => user);
  const routes = token ? privateRoutes : publicRoutes;

  return (
    <List>
      {routes.map(({ NAME, PATH }, index) => (
        <li key={index}>
          {NAME === ROUTE.SIGN_OUT.NAME ? (
            <Button onClick={openModal}>{NAME}</Button>
          ) : (
            <NavLink
              to={PATH}
              activeStyle={{
                background: 'rgba(153, 153, 153, 0.3)',
                borderRadius: '4px',
              }}
            >
              {NAME}
            </NavLink>
          )}
        </li>
      ))}
    </List>
  );
};

const NavBar = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const history = useHistory();

  return (
    <>
      <Container>
        <NavLink to={ROUTE.HOME.PATH}>
          <Logo>
            <img src="/images/logo_small.png" alt="logo" />
            <span>RUNNING MAP</span>
          </Logo>
        </NavLink>
        <Menu openModal={openModal} />
      </Container>
      {isModalOpen && (
        <ConfirmModal
          messages={['로그아웃 하시겠습니까?']}
          closeModal={closeModal}
          onConfirm={() => history.push(ROUTE.SIGN_OUT.PATH)}
        />
      )}
    </>
  );
};

export default NavBar;
