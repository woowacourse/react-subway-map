import React, { ChangeEvent, FC, FocusEventHandler, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { requestEmailCheck, requestSignup } from '../../api/member';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Email from '../../components/@common/Icon/Email';
import Lock from '../../components/@common/Icon/Lock';
import Person from '../../components/@common/Icon/Person';
import { API_INFO } from '../../constants/api';
import { PAGE_INFO, SIGNUP } from '../../constants/appInfo';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constants/message';
import { RootState } from '../../redux/store';
import { isEmail, isEnglishAndNumber } from '../../util/validator';
import { SignupButton, SignupForm, SignupNotificationInput } from './Signup.styles';

const Signup: FC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  //TODO: formInput으로 통일하기
  const [formInput, setFormInput] = useState({
    email: '',
    age: '',
    password: '',
    passwordConfirm: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    age: '',
    password: '',
    passwordConfirm: '',
  });
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const history = useHistory();

  const onChangeEmail = async ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setFormInput({ ...formInput, email: value });

    if (!isEmail(value)) {
      setErrorMessage({ ...errorMessage, email: ERROR_MESSAGE.INVALID_EMAIL });

      return;
    }

    setErrorMessage({ ...errorMessage, email: '' });
  };

  const isDuplicatedEmail = async (email: string) => {
    try {
      await requestEmailCheck(email);

      return false;
    } catch (e) {
      return true;
    }
  };

  const onBlurEmail: FocusEventHandler<HTMLInputElement> = async ({ target: { value } }) => {
    if (errorMessage.email !== '') {
      return;
    }

    if (await isDuplicatedEmail(value)) {
      setErrorMessage({ ...errorMessage, email: ERROR_MESSAGE.DUPLICATED_EMAIL });

      return;
    }

    setErrorMessage({ ...errorMessage, email: '' });
  };

  const onChangeAge = ({ target: { valueAsNumber } }: ChangeEvent<HTMLInputElement>) => {
    setFormInput({
      ...formInput,
      age: String(valueAsNumber),
    });

    if (valueAsNumber < SIGNUP.MIN_AGE || SIGNUP.MAX_AGE < valueAsNumber) {
      setErrorMessage({
        ...errorMessage,
        age: ERROR_MESSAGE.INVALID_RANGE_OF_AGE,
      });

      return;
    }

    setErrorMessage({
      ...errorMessage,
      age: '',
    });
  };

  const onChangePassword = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setFormInput({
      ...formInput,
      password: value,
    });
    setErrorMessage({
      ...errorMessage,
      password: '',
    });

    if (value.length < SIGNUP.PASSWORD_MIN_LENGTH || SIGNUP.PASSWORD_MAX_LENGTH < value.length) {
      setErrorMessage({
        ...errorMessage,
        password: ERROR_MESSAGE.INVALID_RANGE_OF_PASSWORD,
      });
      return;
    }

    if (!isEnglishAndNumber(value)) {
      setErrorMessage({
        ...errorMessage,
        password: ERROR_MESSAGE.INVALID_PASSWORD,
      });
    }
  };

  const onChangePasswordConfirm = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setFormInput({
      ...formInput,
      passwordConfirm: value,
    });
  };

  useEffect(() => {
    if (formInput.password !== formInput.passwordConfirm) {
      setErrorMessage({ ...errorMessage, passwordConfirm: ERROR_MESSAGE.PASSWORD_CONFIRM_FAILURE });

      return;
    }

    setErrorMessage({
      ...errorMessage,
      passwordConfirm: '',
    });
  }, [formInput.password, formInput.passwordConfirm]);

  useEffect(() => {
    if (
      Object.values(formInput).every((input) => input !== '') &&
      Object.values(errorMessage).every((errorMessage) => errorMessage === '')
    ) {
      setIsReadyToSubmit(true);
    }
  }, [formInput, errorMessage]);

  const onSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Object.values(errorMessage).some((errorMessage) => errorMessage !== '')) {
      alert(ERROR_MESSAGE.INVALID_SIGNUP_INPUT);

      return;
    }

    const memberInfo = {
      email: formInput.email,
      age: Number(formInput.age),
      password: formInput.password,
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
          value={formInput.email}
          onChange={onChangeEmail}
          onBlur={onBlurEmail}
          labelIcon={<Email />}
          placeholder="이메일을 입력해주세요."
          message={{ text: errorMessage.email, isError: true }}
          required
        />
        <SignupNotificationInput
          type="number"
          value={formInput.age}
          onChange={onChangeAge}
          labelIcon={<Person />}
          placeholder="나이를 입력해주세요."
          min={SIGNUP.MIN_AGE}
          max={SIGNUP.MAX_AGE}
          message={{ text: errorMessage.age, isError: true }}
          required
        />
        <SignupNotificationInput
          type="password"
          value={formInput.password}
          onChange={onChangePassword}
          labelIcon={<Lock />}
          placeholder="비밀번호를 입력해주세요."
          minLength={SIGNUP.PASSWORD_MIN_LENGTH}
          maxLength={SIGNUP.PASSWORD_MAX_LENGTH}
          message={{ text: errorMessage.password, isError: true }}
          required
        />
        <SignupNotificationInput
          type="password"
          value={formInput.passwordConfirm}
          onChange={onChangePasswordConfirm}
          message={{ text: errorMessage.passwordConfirm, isError: true }}
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
