import { Link, useHistory } from "react-router-dom";

import {
  Flex,
  FlexBetween,
  FlexCenter,
} from "../../components/Layout/FlexContainer/FlexContainer";
import Form from "../../components/Form/Form";
import Block from "../../components/Block/Block";
import InputField from "../../components/Input/InputField";
import Button from "../../components/Button/Button";

import useAuth from "../../hooks/useAuth";

import { validateEmail } from "../../utils/validations/email";
import { validatePassword } from "../../utils/validations/password";
import { SIZE } from "../../utils/constants/size";
import { PAGE_PATH } from "../../utils/constants/route";

const LoginPage = () => {
  const { login } = useAuth();
  const history = useHistory();

  return (
    <Form
      submit={async ({ email, password }) => {
        await login({ email, password });

        history.push(PAGE_PATH.HOME);
      }}
      validators={{ email: validateEmail, password: validatePassword }}
    >
      <FlexCenter>
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
              placeholder="이메일"
              css={{ marginBottom: "0.9375rem" }}
              required
            />
            <InputField
              name="password"
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
      </FlexCenter>
    </Form>
  );
};

export default LoginPage;
