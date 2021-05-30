import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, Input, Button, Select } from '../../components';
import * as Styled from './SignUpPage.styles';
import { ReactComponent as EmailIcon } from '../../assets/icons/envelope-solid.svg';
import { ReactComponent as KeyIcon } from '../../assets/icons/key-solid.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/user-solid.svg';
import BACKEND from '../../constants/backend';
import useInput from '../../hooks/useInput';
import useSelect from '../../hooks/useSelect';
import MESSAGE from '../../constants/message';
import REGEX from '../../constants/regex';
import { CREWS } from '../../types';
import useSignUp from '../../hooks/useSignUp';
import { SIGN_UP } from '../../constants/validation';
import {
  isValidAge,
  isValidEmail,
  isValidPassword,
  isValidPasswordConfirm,
} from './SignUpPageValidation';
import ROUTES from '../../constants/routes';

const SignUpPage = () => {
  const { onSignUp, onCheckDuplicateEmail } = useSignUp();

  const history = useHistory();

  const { value: server, onChange: onChangeServer } = useSelect(CREWS.DANYEE);
  const { value: email, onChange: onChangeEmail, ref: emailRef } = useInput('');
  const { value: ageValue, valueAsNumber: age, onChange: onChangeAge, ref: ageRef } = useInput('');
  const { value: password, onChange: onChangePassword, ref: passwordRef } = useInput('');
  const {
    value: passwordConfirm,
    onChange: onChangePasswordConfirm,
    ref: passwordConfirmRef,
  } = useInput('');
  const [isDuplicatedEmail, setDuplicatedEmail] = useState(false);

  const getInvalidFormRef = () => {
    if (isDuplicatedEmail) return emailRef;
    if (!isValidEmail(email)) return emailRef;
    if (!isValidAge(age)) return ageRef;
    if (!isValidPassword(password)) return passwordRef;
    if (!isValidPasswordConfirm(password, passwordConfirm)) return passwordConfirmRef;

    return null;
  };

  const getErrorMessageEmail = () => {
    if (!email) return null;

    if (!isValidEmail(email)) return MESSAGE.ERROR.INVALID_EMAIL;
    if (isDuplicatedEmail) return MESSAGE.ERROR.DUPLICATED_EMAIL;

    return null;
  };

  const handleCheckDuplicateEmail = async () => {
    try {
      await onCheckDuplicateEmail({ server, email });
      setDuplicatedEmail(false);
    } catch (error) {
      setDuplicatedEmail(true);
    }
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const invalidFormRef = getInvalidFormRef();

    const isSuccess = await onSignUp({
      server,
      email,
      age: Number(age),
      password,
      passwordConfirm,
    });
    invalidFormRef?.current?.focus();

    if (!isSuccess) return;

    history.replace(ROUTES.ROOT);
  };

  return (
    <Styled.SignUpPage>
      <Styled.CardWrapper>
        <Card>
          <Styled.Form onSubmit={handleSignUp}>
            <Styled.HeaderText>회원가입</Styled.HeaderText>
            <Styled.FormItem>
              <Select labelText="서버 선택" value={server} onChange={onChangeServer} required>
                {Object.entries(BACKEND).map(([crew, { name }]) => (
                  <option key={crew} value={crew}>
                    {name}
                  </option>
                ))}
              </Select>
            </Styled.FormItem>
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
                ref={ageRef}
                value={ageValue}
                onChange={onChangeAge}
                icon={<UserIcon />}
                labelText="나이"
                placeholder="나이를 입력해주세요"
                errorMessage={age && !isValidAge(age) ? MESSAGE.ERROR.INVALID_AGE : null}
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
                minLength={SIGN_UP.MIN_PASSWORD_LENGTH}
                labelText="비밀번호"
                placeholder="비밀번호를 입력해주세요"
                pattern={REGEX.noWhiteSpace.source}
                errorMessage={
                  password && !isValidPassword(password) ? MESSAGE.ERROR.INVALID_PASSWORD : null
                }
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
                minLength={SIGN_UP.MIN_PASSWORD_LENGTH}
                labelText="비밀번호 확인"
                placeholder="비밀번호를 한 번 더 입력해주세요"
                pattern={REGEX.noWhiteSpace.source}
                errorMessage={
                  passwordConfirm && !isValidPasswordConfirm(password, passwordConfirm)
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
