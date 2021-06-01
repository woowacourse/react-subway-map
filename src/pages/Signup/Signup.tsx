import React, { FC, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { requestSignup } from '../../api/member';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Email from '../../components/@common/Icon/Email';
import Lock from '../../components/@common/Icon/Lock';
import Person from '../../components/@common/Icon/Person';
import { API_INFO } from '../../constants/api';
import { PAGE_INFO, SIGNUP } from '../../constants/appInfo';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constants/message';
import useNotificationInput from '../../hooks/@shared/useNotificationInput/useNotificationInput';
import useReadyToSubmit from '../../hooks/@shared/useReadyToSubmit/useReadyToSubmit';
import { RootState } from '../../redux/store';
import { isEmail, isEnglishAndNumber } from '../../util/validator';
import { SignupButton, SignupForm, SignupNotificationInput } from './Signup.styles';

const Signup: FC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const history = useHistory();

  const [emailInput, emailErrorMessage, onChangeEmail] = useNotificationInput(
    ({ setInput, setErrorMessage, targetValue }) => {
      setInput(targetValue);

      if (!isEmail(targetValue)) {
        setErrorMessage(ERROR_MESSAGE.INVALID_EMAIL);
        return;
      }

      // TODO: 이메일 중복 확인
      setErrorMessage('');
    }
  );

  const [ageInput, ageErrorMessage, onChangeAge] = useNotificationInput(
    ({ setInput, setErrorMessage, targetValue }) => {
      setInput(targetValue);

      const valueAsNumber = Number(targetValue);

      if (valueAsNumber < SIGNUP.MIN_AGE || SIGNUP.MAX_AGE < valueAsNumber) {
        setErrorMessage(ERROR_MESSAGE.INVALID_RANGE_OF_AGE);

        return;
      }

      setErrorMessage('');
    }
  );

  const [passwordInput, passwordErrorMessage, onChangePassword] = useNotificationInput(
    ({ setInput, setErrorMessage, targetValue }) => {
      setInput(targetValue);
      setErrorMessage('');

      if (
        targetValue.length < SIGNUP.PASSWORD_MIN_LENGTH ||
        SIGNUP.PASSWORD_MAX_LENGTH < targetValue.length
      ) {
        setErrorMessage(ERROR_MESSAGE.INVALID_RANGE_OF_PASSWORD);
        return;
      }

      if (!isEnglishAndNumber(targetValue)) {
        setErrorMessage(ERROR_MESSAGE.INVALID_PASSWORD);
      }
    }
  );

  const [
    passwordConfirmInput,
    passwordConfirmErrorMessage,
    onChangePasswordConfirm,
  ] = useNotificationInput(
    ({ setInput, setErrorMessage, targetValue }) => {
      setInput(targetValue);

      if (passwordInput !== targetValue) {
        setErrorMessage(ERROR_MESSAGE.PASSWORD_CONFIRM_FAILURE);
        return;
      }

      setErrorMessage('');
    },
    [passwordInput]
  );

  const isReadyToSubmit = useReadyToSubmit(
    [emailInput, ageInput, passwordInput, passwordConfirmInput],
    [emailErrorMessage, ageErrorMessage, passwordErrorMessage, passwordConfirmErrorMessage]
  );

  const onSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isReadyToSubmit) {
      alert(ERROR_MESSAGE.INVALID_SIGNUP_INPUT);

      return;
    }

    const memberInfo = {
      email: emailInput,
      age: Number(ageInput),
      password: passwordInput,
    };

    try {
      await requestSignup(memberInfo);

      alert(SUCCESS_MESSAGE.SIGNUP);

      history.push(PAGE_INFO.LOGIN.path);
    } catch (error) {
      alert(ERROR_MESSAGE.SIGNUP);
    }
  };

  return (
    <CardTemplate
      templateColor={API_INFO[apiOwner].themeColor[400]}
      titleText={PAGE_INFO.SIGN_UP.text}
    >
      <SignupForm onSubmit={onSignup}>
        <SignupNotificationInput
          type="email"
          value={emailInput}
          onChange={onChangeEmail}
          labelIcon={<Email />}
          placeholder="이메일을 입력해주세요."
          message={{ text: emailErrorMessage, isError: true }}
          required
        />
        <SignupNotificationInput
          type="number"
          value={ageInput}
          onChange={onChangeAge}
          labelIcon={<Person />}
          placeholder="나이를 입력해주세요."
          min={SIGNUP.MIN_AGE}
          max={SIGNUP.MAX_AGE}
          message={{ text: ageErrorMessage, isError: true }}
          required
        />
        <SignupNotificationInput
          type="password"
          value={passwordInput}
          onChange={onChangePassword}
          labelIcon={<Lock />}
          placeholder="비밀번호를 입력해주세요."
          minLength={SIGNUP.PASSWORD_MIN_LENGTH}
          maxLength={SIGNUP.PASSWORD_MAX_LENGTH}
          message={{ text: passwordErrorMessage, isError: true }}
          required
        />
        <SignupNotificationInput
          type="password"
          value={passwordConfirmInput}
          onChange={onChangePasswordConfirm}
          message={{ text: passwordConfirmErrorMessage, isError: true }}
          labelIcon={<Lock />}
          placeholder="비밀번호를 한번 더 입력해주세요."
          minLength={SIGNUP.PASSWORD_MIN_LENGTH}
          maxLength={SIGNUP.PASSWORD_MAX_LENGTH}
          required
        />
        <SignupButton isColored={true} disabled={!isReadyToSubmit}>
          회원가입
        </SignupButton>
      </SignupForm>
    </CardTemplate>
  );
};

export default Signup;
