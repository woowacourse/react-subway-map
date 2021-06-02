import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CardLayout from 'components/CardLayout/CardLayout';
import Input from 'components/shared/Input/Input';
import Button from 'components/shared/Button/Button';
import ServerSelector from 'components/ServerSelector/ServerSelector';
import Loading from 'components/shared/Loading/Loading';
import { useAppDispatch, useAppSelector } from 'modules/hooks';
import { selectServer } from 'modules/serverSlice';
import { ButtonSize, ButtonType } from 'types';
import emailImg from 'assets/email.png';
import lockImg from 'assets/lock.png';
import userImg from 'assets/user.png';
import Styled from './styles';
import useFetch from 'hooks/useFetch';
import {
  ALERT_MESSAGE,
  API_METHOD,
  API_STATUS,
  END_POINT,
  INPUT,
  NOTIFICATION,
  ROUTE,
} from '../../constants';
import useNotify from 'hooks/useNotify';

const SignupPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const BASE_URL = useAppSelector((state) => state.serverSlice.server);
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isServerMessageVisible, setServerMessageVisible] = useState<boolean>(false);

  const { setNotification: setPasswordNotification, Notification: Passwordnotification } =
    useNotify();
  const { setNotification: setEmailNotification, Notification: EmailNotification } = useNotify();
  const { fetchData: checkDuplicatedEmailAsync } = useFetch(API_METHOD.GET);
  const { fetchData: signupAsync, loading: signupLoading } = useFetch(API_METHOD.POST);

  const checkDuplicatedEmail = async () => {
    if (!email) return;

    const res = await checkDuplicatedEmailAsync(`${END_POINT.AUTH}/exists/${email}`);

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(ALERT_MESSAGE.SERVER_ERROR || ALERT_MESSAGE.SERVER_ERROR);
    } else if (res.status === API_STATUS.FULFILLED) {
      if (res.data.exist) {
        setEmailNotification({
          message: NOTIFICATION.DUPLICATED_EMAIL,
          isValid: false,
          isVisible: true,
        });
      } else {
        setEmailNotification({
          message: NOTIFICATION.AVAILABLE_EMAIL,
          isValid: true,
          isVisible: true,
        });
      }
    }
  };

  const checkPasswordMatch = () => {
    if (password !== confirmPassword) {
      setPasswordNotification({
        message: NOTIFICATION.DISMATCH_PASSWORD,
        isValid: false,
        isVisible: true,
      });
      return false;
    } else {
      setPasswordNotification({
        message: NOTIFICATION.MATCH_PASSWORD,
        isValid: true,
        isVisible: true,
      });
      return true;
    }
  };

  const signup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!checkPasswordMatch()) return;
    if (!BASE_URL) {
      setServerMessageVisible(true);
      return;
    }

    const signupData = { email, password, age: age || INPUT.AGE.MIN };

    const res = await signupAsync(`${END_POINT.AUTH}`, signupData);

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(res.message || ALERT_MESSAGE.SERVER_ERROR);
    } else if (res.status === API_STATUS.FULFILLED) {
      enqueueSnackbar(ALERT_MESSAGE.SUCCESS_TO_SIGNUP);
      history.push(ROUTE.LOGIN);
    }
  };

  const changeServer = (server: string) => {
    dispatch(selectServer({ server }));
    setServerMessageVisible(false);
  };

  return (
    <CardLayout title="회원가입">
      <Loading isLoading={signupLoading} />
      <ServerSelector isMessageVisible={isServerMessageVisible} changeServer={changeServer} />
      <form onSubmit={signup}>
        <Styled.InputContainer>
          <Styled.InputWrapper>
            <Input
              type="email"
              labelText="이메일"
              placeholder="이메일을 입력해주세요."
              value={email}
              icon={emailImg}
              onBlur={checkDuplicatedEmail}
              onChange={(event) => setEmail(event.target.value)}
            />
            <EmailNotification />
          </Styled.InputWrapper>
          <Styled.InputWrapper>
            <Input
              type="number"
              labelText="나이"
              placeholder="나이를 입력해주세요."
              value={age}
              icon={userImg}
              onChange={(event) => setAge(event.target.value)}
              extraArgs={{ min: INPUT.AGE.MIN, max: INPUT.AGE.MAX }}
            />
          </Styled.InputWrapper>
          <Styled.InputWrapper>
            <Input
              type="password"
              labelText="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              icon={lockImg}
              onChange={(event) => setPassword(event.target.value)}
              extraArgs={{ minLength: INPUT.PASSWORD.MIN_LENGTH }}
            />
          </Styled.InputWrapper>
          <Styled.InputWrapper>
            <Input
              type="password"
              labelText="비밀번호 확인"
              placeholder="비밀번호를 한번 더 입력해주세요."
              value={confirmPassword}
              icon={lockImg}
              onChange={(event) => setConfirmPassword(event.target.value)}
              onBlur={checkPasswordMatch}
              extraArgs={{ minLength: INPUT.PASSWORD.MIN_LENGTH }}
            />
            <Passwordnotification />
          </Styled.InputWrapper>
        </Styled.InputContainer>

        <Styled.ButtonWrapper>
          <Button styleType={ButtonType.YELLOW} sizeType={ButtonSize.LARGE}>
            회원가입하기
          </Button>
        </Styled.ButtonWrapper>
      </form>
    </CardLayout>
  );
};

export default SignupPage;
