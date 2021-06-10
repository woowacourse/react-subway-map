import { Redirect, useHistory } from "react-router-dom";

import { Flex, FlexBetween, FlexCenter } from "../../components/@shared/FlexContainer/FlexContainer";
import Block from "../../components/Block/Block";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import useInput from "../../hooks/@common/useInput";
import { PAGE_PATH } from "../../constants/route";
import { validateEmail } from "../../validations/email";
import { validatePassword } from "../../validations/password";
import useAuth from "../../hooks/useAuth";
import { TEST_ID } from "../../@test/testId";
import { MoveToSignupPageLink } from "./LoginPage.styles";

const LoginPage = () => {
  const { inputValue: email, errorMessage: emailErrorMessage, setValueOnChange: onEmailChange } = useInput(
    validateEmail
  );
  const { inputValue: password, errorMessage: passwordErrorMessage, setValueOnChange: onPasswordChange } = useInput(
    validatePassword
  );

  const { login, isAuthenticated } = useAuth();
  const history = useHistory();

  const onLogin: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (emailErrorMessage || passwordErrorMessage) {
      alert("입력이 잘못되어, 로그인 할 수 없습니다");
      return;
    }

    try {
      await login({ email, password });
      history.push(PAGE_PATH.HOME);
    } catch (error) {
      alert(error.message);
    }
  };

  const onMoveToSignupPage = () => {
    history.push(PAGE_PATH.SIGN_UP);
  };

  if (isAuthenticated) {
    return <Redirect to={PAGE_PATH.STATION_MANAGEMENT} />;
  }

  return (
    <FlexCenter data-testid={TEST_ID.LOGIN_PAGE}>
      <form onSubmit={onLogin}>
        <Block style={{ marginTop: "2.5rem", width: "540px", flexDirection: "column", alignItems: "flex-start" }}>
          <FlexBetween style={{ width: "100%", marginBottom: "1rem" }}>
            <h2 style={{ marginBottom: "1rem" }}>👋 로그인</h2>
          </FlexBetween>
          <Flex style={{ width: "100%", flexDirection: "column" }}>
            <Input
              value={email}
              errorMessage={emailErrorMessage}
              placeholder="이메일"
              style={{ marginBottom: "15px" }}
              onChange={onEmailChange}
              required
            />
            <Input
              type="password"
              value={password}
              errorMessage={passwordErrorMessage}
              placeholder="비밀번호"
              style={{ marginBottom: "15px" }}
              onChange={onPasswordChange}
              required
            />
            <Button data-testid={TEST_ID.LOGIN_BUTTON} size="block" style={{ marginBottom: "15px" }}>
              확인
            </Button>
            <p>
              아직 회원이 아니신가요?{" "}
              <MoveToSignupPageLink data-testid={TEST_ID.MOVE_TO_SIGN_UP_BUTTON} onClick={onMoveToSignupPage}>
                회원가입
              </MoveToSignupPageLink>
            </p>
          </Flex>
        </Block>
      </form>
    </FlexCenter>
  );
};

export default LoginPage;
