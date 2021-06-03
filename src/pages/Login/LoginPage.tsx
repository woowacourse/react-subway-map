import { useHistory } from "react-router-dom";

import { Flex, FlexBetween, FlexCenter } from "../../components/@shared/FlexContainer/FlexContainer";
import Block from "../../components/Block/Block";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import useInput from "../../hooks/@common/useInput";
import { PAGE_PATH } from "../../constants/route";
import { validateEmail } from "../../validations/email";
import { validatePassword } from "../../validations/password";
import useAuth from "../../hooks/useAuth";
import TEST_ID from "../../@test/testId";
import { MoveToSignupPageLink } from "./LoginPage.styles";

const LoginPage = () => {
  const {
    inputValue: email,
    errorMessage: emailErrorMessage,
    setValueOnChange: onEmailChange,
    validateOnBlur: onEmailBlur,
  } = useInput(validateEmail);
  const {
    inputValue: password,
    errorMessage: passwordErrorMessage,
    setValueOnChange: onPasswordChange,
    validateOnBlur: onPasswordBlur,
  } = useInput(validatePassword);

  const { login } = useAuth();
  const history = useHistory();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (emailErrorMessage || passwordErrorMessage) {
      alert("로그인 할 수 없습니다");
      return;
    }

    await login({ email, password });
    history.push(PAGE_PATH.HOME);
  };

  const onMoveToSignupPage = () => {
    history.push(PAGE_PATH.SIGN_UP);
  };

  return (
    <FlexCenter>
      <form onSubmit={onSubmit}>
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
              onBlur={onEmailBlur}
              required
            />
            <Input
              type="password"
              value={password}
              errorMessage={passwordErrorMessage}
              placeholder="비밀번호"
              style={{ marginBottom: "15px" }}
              onChange={onPasswordChange}
              onBlur={onPasswordBlur}
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
