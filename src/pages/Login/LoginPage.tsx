import { Link, useHistory } from "react-router-dom";

import { Block, Button, InputField } from "../../components";
import { Flex, FlexBetween, FlexCenter } from "../../components";

import { useAuth, useForm } from "../../hooks";

import { validateEmail, validatePassword } from "../../validations";
import { SIZE } from "../../constants";
import { PAGE_PATH } from "../../constants";

const LoginPage = () => {
  const {
    values: { email, password },
    isValid,
  } = useForm();

  const { login } = useAuth();
  const history = useHistory();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!isValid) {
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
          css={{
            marginTop: "2.5rem",
            width: SIZE.PAGE_CONTAINER_WIDTH,
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <FlexBetween css={{ width: "100%", marginBottom: "1rem" }}>
            <h2 css={{ marginBottom: "1rem" }}>👋 로그인</h2>
          </FlexBetween>
          <Flex css={{ width: "100%", flexDirection: "column" }}>
            <InputField
              name="email"
              validator={validateEmail}
              placeholder="이메일"
              css={{ marginBottom: "0.9375rem" }}
              required
            />
            <InputField
              name="password"
              validator={validatePassword}
              type="password"
              placeholder="비밀번호"
              css={{ marginBottom: "0.9375rem" }}
              required
            />
            <Button size="block" css={{ marginBottom: "0.9375rem" }}>
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
