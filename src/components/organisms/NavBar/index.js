import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { useLogin } from '../../../hooks';
import { Button, IconLogo, IconPerson, IconSearch, IconSetting, IconWindow } from '../..';
import { Nav, TitleButton, Title, SubTitle, MainTitle, Menu, MenuList, MenuItem } from './style';
import { ROUTE } from '../../../constants';

const FE_CONTRIBUTORS = '티케 하루의';

export const NavBar = (props) => {
  const { serverOwner } = props;
  const { isLogin, isLogout, requestLogout, removeToken, goToAllowedPage, notifyLogoutResult } = useLogin();
  const subTitle = serverOwner ? `${serverOwner} & ${FE_CONTRIBUTORS}` : `${FE_CONTRIBUTORS}`;

  const handleLogoutRequest = () => requestLogout();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isLogout) {
      notifyLogoutResult();
      removeToken();
      goToAllowedPage();
    }
  }, [isLogout]);

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
        {/* TODO: 전체보기 기능, 경로탐색 기능 2단계에서 추가 */}
        <MenuList style={{ visibility: 'hidden' }}>
          <MenuItem>
            <NavLink activeClassName="selected" to={ROUTE.MAP}>
              <IconWindow />
              전체보기
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink activeClassName="selected" to={ROUTE.SEARCH}>
              <IconSearch />
              경로탐색
            </NavLink>
          </MenuItem>
        </MenuList>

        {isLogin && (
          <MenuList>
            <MenuItem>
              <NavLink activeClassName="selected" to={ROUTE.STATION}>
                <IconSetting />
                역관리
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink activeClassName="selected" to={ROUTE.LINE}>
                <IconSetting />
                노선관리
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink activeClassName="selected" to={ROUTE.SECTION}>
                <IconSetting />
                구간관리
              </NavLink>
            </MenuItem>
          </MenuList>
        )}

        <MenuList>
          <MenuItem>
            {isLogin ? (
              <Button onClick={handleLogoutRequest}>
                <IconPerson />
                로그아웃
              </Button>
            ) : (
              <NavLink activeClassName="selected" to={ROUTE.LOGIN}>
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
};
