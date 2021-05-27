import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { useCookies } from 'react-cookie';

import { logout, clearLogout } from '../../../redux/userSlice';
import { Button, IconLogo, IconPerson, IconSearch, IconSetting, IconWindow } from '../..';
import { Nav, TitleButton, Title, SubTitle, MainTitle, Menu, MenuList, MenuItem } from './style';
import { ACCESS_TOKEN, ROUTE, SERVER_ID } from '../../../constants';

const FE_CONTRIBUTORS = '티케 하루의';

export const NavBar = (props) => {
  const { serverOwner } = props;

  const history = useHistory();
  const dispatch = useDispatch();
  const { isLogin, isLogout } = useSelector((store) => store.user);
  const [cookies, setCookie, removeCookie] = useCookies([SERVER_ID]);
  const subTitle = serverOwner ? `${serverOwner} & ${FE_CONTRIBUTORS}` : `${FE_CONTRIBUTORS}`;

  const handleLogout = () => {
    dispatch(logout());

    if (isLogout) {
      removeCookie(ACCESS_TOKEN);
      dispatch(clearLogout());
    }
    history.push(ROUTE.LOGIN);
  };

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

        {isLogin && (
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
        )}

        <MenuList>
          <MenuItem>
            {isLogin ? (
              <Button onClick={handleLogout}>
                <IconPerson />
                로그아웃
              </Button>
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
};
