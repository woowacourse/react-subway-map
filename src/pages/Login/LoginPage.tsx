import { Link, useHistory } from "react-router-dom";

import { Flex, FlexBetween, FlexCenter } from "../../components/@shared/FlexContainer/FlexContainer";
import Block from "../../components/Block/Block";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import useInput from "../../hooks/@common/useInput";
import { login } from "../../modules/auth";
import { PAGE_PATH } from "../../constants/route";
import { validateEmail } from "../../validations/email";
import { validatePassword } from "../../validations/password";
import { useAppDispatch } from "../../hooks";

const LoginPage = () => {
  const [email, emailErrorMessage, onEmailChange, onEmailBlur] = useInput(validateEmail);
  const [password, passwordErrorMessage, onPasswordChange, onPasswordBlur] = useInput(validatePassword);

  const dispatch = useAppDispatch();
  const history = useHistory();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    await dispatch(login({ email, password }));
    history.push(PAGE_PATH.HOME);
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
              type="email"
              value={email}
              errorMessage={emailErrorMessage}
              placeholder="이메일"
              style={{ marginBottom: "15px" }}
              onChange={onEmailChange}
              onBlur={onEmailBlur}
              required
            />
            <Input
              value={password}
              errorMessage={passwordErrorMessage}
              placeholder="비밀번호"
              style={{ marginBottom: "15px" }}
              onChange={onPasswordChange}
              onBlur={onPasswordBlur}
              required
            />
            <Button size="block" style={{ marginBottom: "15px" }}>
              확인
            </Button>
            <p>
              아직 회원이 아니신가요? <Link to={PAGE_PATH.SIGN_UP}>회원가입</Link>
            </p>
          </Flex>
        </Block>
      </form>
    </FlexCenter>
  );
};

export default LoginPage;
