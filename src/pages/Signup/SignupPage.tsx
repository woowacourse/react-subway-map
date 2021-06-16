import { useHistory } from "react-router-dom";

import { Flex, FlexBetween, FlexCenter, InputField } from "../../components";
import { Block, Button } from "../../components";

import { useAuth, useForm } from "../../hooks";
import {
  validateAge,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from "../../validations";
import { PAGE_PATH } from "../../constants";
import { SIZE } from "../../constants";

const SignupPage = () => {
  const {
    values: { email, age, password },
    isValid,
  } = useForm();

  const { signup } = useAuth();

  const history = useHistory();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!isValid) {
      alert("회원가입할 수 없습니다");
      return;
    }

    await signup({ email, age: Number(age), password });
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
            <h2 css={{ marginBottom: "1rem" }}>📝 회원가입</h2>
          </FlexBetween>
          <Flex css={{ width: "100%", flexDirection: "column" }}>
            <InputField
              name="email"
              validator={validateEmail}
              placeholder="이메일"
              css={{ marginBottom: "0.9375rem" }}
            />
            <InputField
              name="age"
              validator={validateAge}
              type="number"
              placeholder="나이"
              min="1"
              max="200"
              css={{ marginBottom: "0.9375rem" }}
            />
            <InputField
              name="password"
              validator={validatePassword}
              type="password"
              placeholder="비밀번호"
              css={{ marginBottom: "0.9375rem" }}
            />
            <InputField
              name="passwordConfirm"
              validator={(value: string) => {
                validatePasswordConfirm(password, value);
              }}
              type="password"
              placeholder="비밀번호 확인"
              css={{ marginBottom: "1.5625rem" }}
            />
            <Button size="block">확인</Button>
          </Flex>
        </Block>
      </form>
    </FlexCenter>
  );
};

export default SignupPage;
