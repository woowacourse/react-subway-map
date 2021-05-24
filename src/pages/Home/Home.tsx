import React, { ChangeEvent, FC } from 'react';
import { useSelector } from 'react-redux';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import ColorRadio from '../../components/@common/ColorRadio/ColorRadio';
import StyledLink from '../../components/@shared/StyledLink/StyledLink';
import { API_INFO } from '../../constants/api';
import { PAGE_INFO, THEME_COLOR } from '../../constants/appInfo';
import { changeOwner } from '../../redux/apiSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { APIList, HomeLinkContainer } from './Home.styles';

const Home: FC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const dispatch = useAppDispatch();

  const onChangeApi = (event: ChangeEvent<HTMLInputElement>) => {
    const owner = event.target.value;

    dispatch(changeOwner(owner));
  };

  return (
    <CardTemplate titleText="API 선택" templateColor={THEME_COLOR[400]}>
      <APIList>
        {Object.keys(API_INFO).map((apiInfoKey) => (
          <li key={apiInfoKey}>
            <ColorRadio
              groupName="api"
              value={apiInfoKey}
              radioColor={API_INFO[apiInfoKey].themeColor[300] as string}
              labelText={{ text: API_INFO[apiInfoKey].name, isVisible: true }}
              isChecked={apiInfoKey === apiOwner}
              onChange={onChangeApi}
            />
          </li>
        ))}
      </APIList>
      <HomeLinkContainer justifyContent="center">
        <StyledLink to={PAGE_INFO.LOGIN.path}>{PAGE_INFO.LOGIN.text}</StyledLink>
        <StyledLink to={PAGE_INFO.SIGN_UP.path}>{PAGE_INFO.SIGN_UP.text}</StyledLink>
      </HomeLinkContainer>
    </CardTemplate>
  );
};

export default Home;
