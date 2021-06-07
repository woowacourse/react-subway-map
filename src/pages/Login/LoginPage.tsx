import { Link, useHistory } from "react-router-dom";

import { Block, Button, Input } from "../../components";
import { Flex, FlexBetween, FlexCenter } from "../../components";

import { useInput, useAuth } from "../../hooks";

import { validateEmail } from "../../validations/email";
import { validatePassword } from "../../validations/password";

import { SIZE } from "../../constants/size";
import { PAGE_PATH } from "../../constants/route";

const LoginPage = () => {
  const {
    inputValue: email,
    errorMessage: emailErrorMessage,
    setValueOnChange: onEmailChange,
  } = useInput(validateEmail);
  const {
    inputValue: password,
    errorMessage: passwordErrorMessage,
    setValueOnChange: onPasswordChange,
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

  return (
    <FlexCenter>
      <form onSubmit={onSubmit}>
        <Block
          style={{
            marginTop: "2.5rem",
            width: SIZE.PAGE_CONTAINER_WIDTH,
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <FlexBetween style={{ width: "100%", marginBottom: "1rem" }}>
            <h2 style={{ marginBottom: "1rem" }}>👋 로그인</h2>
          </FlexBetween>
          <Flex style={{ width: "100%", flexDirection: "column" }}>
            <Input
              value={email}
              errorMessage={emailErrorMessage}
              placeholder="이메일"
              style={{ marginBottom: "0.9375rem" }}
              onChange={onEmailChange}
              required
            />
            <Input
              type="password"
              value={password}
              errorMessage={passwordErrorMessage}
              placeholder="비밀번호"
              style={{ marginBottom: "0.9375rem" }}
              onChange={onPasswordChange}
              required
            />
            <Button size="block" style={{ marginBottom: "0.9375rem" }}>
              확인
            </Button>
            <p>
              아직 회원이 아니신가요?
              <Link to={PAGE_PATH.SIGN_UP}>회원가입</Link>
            </p>
          </Flex>
        </Block>
      </form>
    </FlexCenter>
  );
};

export default LoginPage;
