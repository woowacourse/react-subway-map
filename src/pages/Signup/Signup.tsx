import React, {
  ChangeEventHandler,
  FocusEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router';
import { requestEmailCheck, requestSignup } from '../../api/member';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Email from '../../components/@common/Icon/Email';
import Lock from '../../components/@common/Icon/Lock';
import Person from '../../components/@common/Icon/Person';
import { PAGE_INFO, SIGN_UP } from '../../constants/appInfo';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constants/message';
import useThemeColor from '../../hooks/useThemeColor';
import { isEmail, isEnglishAndNumber } from '../../util/validator';
import { SignupButton, SignupForm, SignupNotificationInput } from './Signup.styles';

const Signup = (): JSX.Element => {
  const themeColor = useThemeColor();
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

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = async ({ target: { value } }) => {
    setFormInput({ ...formInput, email: value });

    if (!isEmail(value)) {
      setErrorMessage({ ...errorMessage, email: ERROR_MESSAGE.INVALID_EMAIL });

      return;
    }

    setErrorMessage({ ...errorMessage, email: '' });
  };

  const checkDuplicatedEmail = async (email: string) => {
    try {
      await requestEmailCheck(email);

      return '';
    } catch (e) {
      return e.response?.data.errorMessage || ERROR_MESSAGE.DUPLICATED_EMAIL;
    }
  };

  const onBlurEmail: FocusEventHandler<HTMLInputElement> = async ({ target: { value } }) => {
    if (errorMessage.email !== '') {
      return;
    }

    const checkMessage = await checkDuplicatedEmail(value);
    setErrorMessage({ ...errorMessage, email: checkMessage });
  };

  const onChangeAge: ChangeEventHandler<HTMLInputElement> = ({ target: { valueAsNumber } }) => {
    setFormInput({
      ...formInput,
      age: String(valueAsNumber),
    });

    if (valueAsNumber < SIGN_UP.MIN_AGE || SIGN_UP.MAX_AGE < valueAsNumber) {
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

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setFormInput({
      ...formInput,
      password: value,
    });

    if (value.length < SIGN_UP.PASSWORD_MIN_LENGTH || SIGN_UP.PASSWORD_MAX_LENGTH < value.length) {
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

      return;
    }

    setErrorMessage({
      ...errorMessage,
      password: '',
    });
  };

  const onChangePasswordConfirm: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
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

  const onSignup: FormEventHandler = async (event) => {
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
    <CardTemplate templateColor={themeColor[400]} titleText={PAGE_INFO.SIGN_UP.text}>
      <SignupForm onSubmit={onSignup} role="form">
        <SignupNotificationInput
          type="email"
          value={formInput.email}
          onChange={onChangeEmail}
          onBlur={onBlurEmail}
          labelIcon={<Email />}
          placeholder={SIGN_UP.EMAIL_PLACEHOLDER}
          message={{ text: errorMessage.email, isError: true }}
          required
        />
        <SignupNotificationInput
          type="number"
          value={formInput.age}
          onChange={onChangeAge}
          labelIcon={<Person />}
          placeholder={SIGN_UP.AGE_PLACEHOLDER}
          min={SIGN_UP.MIN_AGE}
          max={SIGN_UP.MAX_AGE}
          message={{ text: errorMessage.age, isError: true }}
          required
        />
        <SignupNotificationInput
          type="password"
          value={formInput.password}
          onChange={onChangePassword}
          labelIcon={<Lock />}
          placeholder={SIGN_UP.PASSWORD_PLACEHOLDER}
          minLength={SIGN_UP.PASSWORD_MIN_LENGTH}
          maxLength={SIGN_UP.PASSWORD_MAX_LENGTH}
          message={{ text: errorMessage.password, isError: true }}
          required
        />
        <SignupNotificationInput
          type="password"
          value={formInput.passwordConfirm}
          onChange={onChangePasswordConfirm}
          message={{ text: errorMessage.passwordConfirm, isError: true }}
          labelIcon={<Lock />}
          placeholder={SIGN_UP.PASSWORD_CONFIRM_PLACEHOLDER}
          minLength={SIGN_UP.PASSWORD_MIN_LENGTH}
          maxLength={SIGN_UP.PASSWORD_MAX_LENGTH}
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
