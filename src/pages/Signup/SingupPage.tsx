import { useHistory } from "react-router-dom";

import { Flex, FlexBetween, FlexCenter } from "../../components/@shared/FlexContainer/FlexContainer";
import Block from "../../components/Block/Block";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { PAGE_PATH } from "../../constants/route";
import { useAppDispatch } from "../../hooks";
import useInput from "../../hooks/@common/useInput";
import { signup } from "../../modules/auth";
import { validateAge } from "../../validations/age";
import { validateEmail } from "../../validations/email";
import { validatePassword, validatePasswordConfirm } from "../../validations/password";

const SignupPage = () => {
  const [email, emailErrorMessage, onEmailChange, onEmailBlur] = useInput(validateEmail);
  const [age, ageErrorMessage, onAgeChange, onAgeBlur] = useInput(validateAge);
  const [password, passwordErrorMessage, onPasswordChange, onPasswordBlur] = useInput(validatePassword);
  const [passwordConfirm, passwordConfirmErrorMessage, onPasswordConfirmChange, onPasswordConfirmBlur] = useInput(
    (value: string) => {
      if (password && !passwordErrorMessage) {
        validatePasswordConfirm(password, value);
      }
    }
  );

  const dispatch = useAppDispatch();
  const history = useHistory();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    await dispatch(signup({ email, age: Number(age), password }));
    history.push(PAGE_PATH.HOME);
  };

  return (
    <FlexCenter>
      <form onSubmit={onSubmit}>
        <Block style={{ marginTop: "2.5rem", width: "540px", flexDirection: "column", alignItems: "flex-start" }}>
          <FlexBetween style={{ width: "100%", marginBottom: "1rem" }}>
            <h2 style={{ marginBottom: "1rem" }}>📝 회원가입</h2>
          </FlexBetween>
          <Flex style={{ width: "100%", flexDirection: "column" }}>
            <Input
              value={email}
              errorMessage={emailErrorMessage}
              placeholder="이메일"
              style={{ marginBottom: "15px" }}
              onChange={onEmailChange}
              onBlur={onEmailBlur}
            />
            <Input
              type="number"
              value={age}
              errorMessage={ageErrorMessage}
              placeholder="나이"
              min="1"
              max="200"
              style={{ marginBottom: "15px" }}
              onChange={onAgeChange}
              onBlur={onAgeBlur}
            />
            <Input
              type="password"
              value={password}
              errorMessage={passwordErrorMessage}
              placeholder="비밀번호"
              style={{ marginBottom: "15px" }}
              onChange={onPasswordChange}
              onBlur={onPasswordBlur}
            />
            <Input
              type="password"
              value={passwordConfirm}
              errorMessage={passwordConfirmErrorMessage}
              placeholder="비밀번호 확인"
              style={{ marginBottom: "25px" }}
              onChange={onPasswordConfirmChange}
              onBlur={onPasswordConfirmBlur}
            />
            <Button size="block">확인</Button>
          </Flex>
        </Block>
      </form>
    </FlexCenter>
  );
};

export default SignupPage;
