import React from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { IconLogo, IconPerson, IconSearch, IconSetting, IconWindow } from '../..';
import { Nav, TitleButton, Title, SubTitle, MainTitle, Menu, MenuList, MenuItem } from './style';
import { ROUTE } from '../../../constants';

const FE_CONTRIBUTORS = '티케 하루의';

export const NavBar = (props) => {
  const { serverOwner, isLoggedIn } = props;
  const subTitle = serverOwner ? `${serverOwner} & ${FE_CONTRIBUTORS}` : `${FE_CONTRIBUTORS}`;

  return (
    <Nav>
      <TitleButton>
        <IconLogo />
        <Title>
          <SubTitle>{subTitle}</SubTitle>
          <MainTitle>우아한 지하철노선도</MainTitle>
        </Title>
      </TitleButton>

      <Menu>
        <MenuList>
          <MenuItem>
            <NavLink to={ROUTE.MAP}>
              <IconWindow />
              전체보기
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to={ROUTE.SEARCH}>
              <IconSearch />
              경로탐색
            </NavLink>
          </MenuItem>
        </MenuList>

        <MenuList>
          <MenuItem>
            <NavLink to={ROUTE.STATION}>
              <IconSetting />
              역관리
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to={ROUTE.LINE}>
              <IconSetting />
              노선관리
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to={ROUTE.SECTION}>
              <IconSetting />
              구간관리
            </NavLink>
          </MenuItem>
        </MenuList>

        <MenuList>
          <MenuItem>
            {isLoggedIn ? (
              <NavLink to={ROUTE.LOGIN}>
                <IconPerson />
                로그아웃
              </NavLink>
            ) : (
              <NavLink to={ROUTE.LOGIN}>
                <IconPerson />
                로그인
              </NavLink>
            )}
          </MenuItem>
        </MenuList>
      </Menu>
    </Nav>
  );
};

NavBar.propTypes = {
  serverOwner: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
};
