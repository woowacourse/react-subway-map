import Input from '../@commons/Input/Input';
import * as S from './SignInForm.styles';
import mailSVG from '../../assets/svg/mail.svg';
import lockSVG from '../../assets/svg/lock.svg';
import Button from '../@commons/Button/Button';
import SelectInput from '../@commons/SelectInput/SelectInput';
import { Link } from 'react-router-dom';
import { BASE_URL, ROUTE, SERVER } from '../../constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, selectServer } from '../../modules/user/userReducer';
import React, { useState } from 'react';

import { RootState } from '../../modules';
import { getEmailErrorMessage, getPasswordErrorMessage } from './SignInForm.validation';

const SignInForm = () => {
  const { serverName } = useSelector((state: RootState) => state.user);
  const [serverURL, setServerURL] = useState('');
  const isServerSelected = Boolean(serverName);
  const dispatch = useDispatch();

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const handleSelectServer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    SERVER.URL = e.target.value;
    setServerURL(e.target.value);
    dispatch(selectServer({ serverName: e.target[e.target.selectedIndex].innerText, baseURL: e.target.value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidForm) return;

    const { email, password } = loginInfo;
    dispatch(loginAsync({ email, password }));
  };

  const emailErrorMessage = getEmailErrorMessage(loginInfo.email);
  const passwordErrorMessage = getPasswordErrorMessage(loginInfo.password);
  const isValidForm = !(emailErrorMessage || passwordErrorMessage) && isServerSelected;

  return (
    <S.SignInForm onSubmit={handleLogIn}>
      <S.Title>로그인</S.Title>
      <S.InputWrapper>
        <Input
          type='email'
          value={loginInfo.email}
          emoji={mailSVG}
          placeholder='이메일을 입력해주세요'
          name='email'
          onChange={handleChange}
        />
        <S.Message>{loginInfo.email && emailErrorMessage}</S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input
          type='password'
          value={loginInfo.password}
          emoji={lockSVG}
          placeholder='비밀번호를 입력해주세요'
          name='password'
          onChange={handleChange}
        />
        <S.Message>{loginInfo.password && passwordErrorMessage}</S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <SelectInput initialText='서버를 선택해주세요.' value={serverURL} onChange={handleSelectServer}>
          {Object.values(BASE_URL).map(({ name, URL }) => (
            <option key={name} value={URL}>
              {name}
            </option>
          ))}
        </SelectInput>
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.ButtonWrapper>
        <Button isDisabled={isValidForm ? false : true}>로그인</Button>
      </S.ButtonWrapper>
      <S.SignUpLinkWrapper>
        <Link to={ROUTE.SIGN_UP}>아직 회원이 아니신가요?</Link>
      </S.SignUpLinkWrapper>
    </S.SignInForm>
  );
};

export default SignInForm;
