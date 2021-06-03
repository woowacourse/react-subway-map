import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Card, Input, Button } from '../../components';
import * as Styled from './SignUpPage.styles';
import { ReactComponent as EmailIcon } from '../../assets/icons/envelope-solid.svg';
import { ReactComponent as KeyIcon } from '../../assets/icons/key-solid.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/user-solid.svg';
import useInput from '../../hooks/useInput';
import useAuth from '../../hooks/useAuth';
import BACKEND from '../../constants/backend';
import ROUTES from '../../constants/routes';
import MESSAGE from '../../constants/message';
import REGEX from '../../constants/regex';

const SignUpPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();

  const { server } = useAuth();
  const { value: email, onChange: onChangeEmail, ref: emailRef } = useInput('');
  const { value: age, onChange: onChangeAge } = useInput('');
  const { value: password, onChange: onChangePassword, ref: passwordRef } = useInput('');
  const {
    value: passwordConfirm,
    onChange: onChangePasswordConfirm,
    ref: passwordConfirmRef,
  } = useInput('');
  const [isDuplicatedEmail, setDuplicatedEmail] = useState(false);

  const isValidEmail = REGEX.isEmail.test(email);
  const isValidPassword = password.length >= 8;
  const isValidPasswordConfirm = password === passwordConfirm;

  const requestCreateMember = (newMember: { email: string; age: number; password: string }) =>
    axios.post(`${BACKEND[server].baseUrl}/members`, newMember, {
      headers: { 'Content-Type': 'application/json' },
    });

  const requestCheckDuplicateEmail = (currentEmail: string) =>
    axios.post(
      `${BACKEND[server].baseUrl}/members/exists`,
      { email: currentEmail },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

  const getInvalidFormRef = () => {
    if (isDuplicatedEmail) return emailRef;
    if (!isValidEmail) return emailRef;
    if (!isValidPassword) return passwordRef;
    if (!isValidPasswordConfirm) return passwordConfirmRef;

    return null;
  };

  const getErrorMessageEmail = () => {
    if (!email) return null;

    if (!isValidEmail) return MESSAGE.ERROR.INVALID_EMAIL;
    if (isDuplicatedEmail) return MESSAGE.ERROR.DUPLICATED_EMAIL;

    return null;
  };

  const handleCheckDuplicateEmail = async () => {
    try {
      await requestCheckDuplicateEmail(email);
      setDuplicatedEmail(false);
    } catch (error) {
      setDuplicatedEmail(true);
    }
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const invalidFormRef = getInvalidFormRef();
    if (invalidFormRef) {
      invalidFormRef.current?.focus();

      return;
    }

    const newMember = {
      email,
      age: Number(age),
      password,
    };

    try {
      await requestCreateMember(newMember);

      enqueueSnackbar(MESSAGE.SUCCESS.SIGNUP);
      history.replace(ROUTES.ROOT);
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, {
        variant: 'error',
      });
    }
  };

  return (
    <Styled.SignUpPage>
      <Styled.CardWrapper>
        <Card>
          <Styled.Form onSubmit={handleSignUp}>
            <Styled.HeaderText>회원가입</Styled.HeaderText>
            <Styled.FormItem>
              <Input
                ref={emailRef}
                value={email}
                onChange={onChangeEmail}
                onBlur={handleCheckDuplicateEmail}
                icon={<EmailIcon />}
                labelText="이메일"
                placeholder="이메일을 입력해주세요"
                pattern={REGEX.isEmail.source}
                errorMessage={getErrorMessageEmail()}
                autoFocus
                required
              />
            </Styled.FormItem>
            <Styled.FormItem>
              <Input
                value={age}
                onChange={onChangeAge}
                icon={<UserIcon />}
                labelText="나이"
                placeholder="나이를 입력해주세요"
                type="number"
                min="1"
                max="150"
                required
              />
            </Styled.FormItem>
            <Styled.FormItem>
              <Input
                ref={passwordRef}
                value={password}
                onChange={onChangePassword}
                icon={<KeyIcon />}
                type="password"
                minLength={8}
                labelText="비밀번호"
                placeholder="비밀번호를 입력해주세요"
                pattern={REGEX.noWhiteSpace.source}
                errorMessage={password && !isValidPassword ? MESSAGE.ERROR.INVALID_PASSWORD : null}
                required
              />
            </Styled.FormItem>
            <Styled.FormItem>
              <Input
                ref={passwordConfirmRef}
                value={passwordConfirm}
                onChange={onChangePasswordConfirm}
                icon={<KeyIcon />}
                type="password"
                minLength={8}
                labelText="비밀번호 확인"
                placeholder="비밀번호를 한 번 더 입력해주세요"
                pattern={REGEX.noWhiteSpace.source}
                errorMessage={
                  passwordConfirm && !isValidPasswordConfirm
                    ? MESSAGE.ERROR.DIFFERENT_PASSWORD
                    : null
                }
                required
              />
            </Styled.FormItem>
            <Styled.FormItem>
              <Styled.SignUpButton>
                <Button fullWidth variant="primary">
                  회원가입
                </Button>
              </Styled.SignUpButton>
              <Link to="/">로그인으로 돌아가기</Link>
            </Styled.FormItem>
          </Styled.Form>
        </Card>
      </Styled.CardWrapper>
    </Styled.SignUpPage>
  );
};

export default SignUpPage;
