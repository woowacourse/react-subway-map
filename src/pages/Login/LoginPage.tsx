import { Link, useHistory } from "react-router-dom";

import {
  Block,
  Button,
  Form,
  FormProvider,
  InputField,
} from "../../components";
import { Flex, FlexBetween, FlexCenter } from "../../components";

import { useAuth } from "../../hooks";

import { validateEmail, validatePassword } from "../../validations";
import { SIZE } from "../../constants";
import { PAGE_PATH } from "../../constants";

const LoginPage = () => {
  const { login } = useAuth();
  const history = useHistory();

  return (
    <FormProvider
      submit={async ({ email, password }) => {
        await login({ email, password });

        history.push(PAGE_PATH.HOME);
      }}
      validators={{ email: validateEmail, password: validatePassword }}
    >
      <FlexCenter>
        <Form>
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
        </Form>
      </FlexCenter>
    </FormProvider>
  );
};

export default LoginPage;
