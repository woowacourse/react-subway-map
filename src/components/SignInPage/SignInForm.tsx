import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../@commons/Input/Input';
import Button from '../@commons/Button/Button';
import SelectInput from '../@commons/SelectInput/SelectInput';
import { getEmailErrorMessage, getPasswordErrorMessage } from './SignInForm.validation';
import mailSVG from '../../assets/svg/mail.svg';
import lockSVG from '../../assets/svg/lock.svg';
import * as S from './SignInForm.styles';
import { BASE_URL, ROUTE } from '../../constants/route';
import useUser from '../../hook/useUser';

const SignInForm = () => {
  const { selectServer, serverName, login } = useUser();
  const [serverURL, setServerURL] = useState('');
  const isServerSelected = Boolean(serverName);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const emailErrorMessage = getEmailErrorMessage(loginInfo.email);
  const passwordErrorMessage = getPasswordErrorMessage(loginInfo.password);
  const isValidForm = !(emailErrorMessage || passwordErrorMessage) && isServerSelected;

  const handleSelectServer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServerURL(e.target.value);
    selectServer({ serverName: e.target[e.target.selectedIndex]?.innerText ?? '', baseURL: e.target.value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidForm) return;

    login(loginInfo);
  };

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
        <Button isDisabled={!isValidForm}>로그인</Button>
      </S.ButtonWrapper>
      <S.SignUpLinkWrapper>
        <Link to={ROUTE.SIGN_UP}>아직 회원이 아니신가요?</Link>
      </S.SignUpLinkWrapper>
    </S.SignInForm>
  );
};

export default SignInForm;
