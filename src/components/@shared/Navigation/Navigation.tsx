import PropTypes from 'prop-types';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { API_INFO } from '../../../constants/api';
import { PAGE_INFO } from '../../../constants/appInfo';
import { logout } from '../../../redux/loginSlice';
import { clearRootReducer, RootState, useAppDispatch } from '../../../redux/store';
import { Page } from '../../../types';
import StyledLink from '../StyledLink/StyledLink';
import { NavButton, NavList } from './Navigation.styles';

interface Props {
  navInfoList: Page[];
}

const Navigation: FC<Props> = ({ navInfoList }) => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
    clearRootReducer();
    history.push(PAGE_INFO.HOME.path);
  };

  return (
    <nav>
      <NavList>
        {navInfoList.map((navInfo, index) => (
          <li key={index}>
            <StyledLink linkColor={API_INFO[apiOwner].themeColor[400]} to={navInfo.path}>
              {navInfo.text}
            </StyledLink>
          </li>
        ))}
        <li>
          {isLogin ? (
            <NavButton type="button" onClick={onLogout} isColored={false}>
              로그아웃
            </NavButton>
          ) : (
            <StyledLink linkColor={API_INFO[apiOwner].themeColor[400]} to={PAGE_INFO.LOGIN.path}>
              {PAGE_INFO.LOGIN.text}
            </StyledLink>
          )}
        </li>
      </NavList>
    </nav>
  );
};

Navigation.propTypes = {
  navInfoList: PropTypes.array.isRequired,
};

export default Navigation;
