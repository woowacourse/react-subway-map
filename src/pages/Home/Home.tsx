import React, { FC } from 'react';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import ColorRadio from '../../components/@common/ColorRadio/ColorRadio';
import StyledLink from '../../components/@shared/StyledLink/StyledLink';
import { API_INFO } from '../../constants/api';
import { PAGE_INFO, THEME_COLOR } from '../../constants/appInfo';
import { APIList, HomeLinkContainer } from './Home.styles';

const Home: FC = () => {
  return (
    <CardTemplate titleText="API 선택" templateColor={THEME_COLOR[400]}>
      <APIList>
        {Object.keys(API_INFO).map((apiInfoKey, index) => (
          <li key={apiInfoKey}>
            <ColorRadio
              groupName="api"
              radioColor={API_INFO[apiInfoKey].themeColor[300] as string}
              labelText={{ text: API_INFO[apiInfoKey].name, isVisible: true }}
              isChecked={index === 0}
              onChange={() => console.log('하이')}
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
