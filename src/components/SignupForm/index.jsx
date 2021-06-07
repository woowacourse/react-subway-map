import React from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../pages/Signup/slice";
import { useInput } from "../@shared/Input/hooks";
import Input from "../@shared/Input";
import Button from "../@shared/Button";
import { useSignupAge, useSignupEmail, useSignupPassword } from "./hooks";

const SignupForm = () => {
  const dispatch = useDispatch();
  const [email, handleEmailChange, isEmailValid] = useSignupEmail();
  const [age, handleAgeChange, isAgeValid] = useSignupAge();
  const [password, handlePasswordChange, isPasswordValid] = useSignupPassword();
  const [passwordConfirm, handlePasswordConfirmChange, isPasswordConfirmValid] =
    useInput((value) => value === password);

  const isSubmitEnabled = [
    isEmailValid,
    isAgeValid,
    isPasswordValid,
    isPasswordConfirmValid,
  ].every(Boolean);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signup({ email, password, age }));
  };

  return (
    <form className="flex flex-col px-8 space-y-8" onSubmit={handleSubmit}>
      <Input
        id="email"
        type="email"
        placeholder="✉️ 이메일을 입력해주세요"
        value={email}
        isValid={isEmailValid}
        onChange={handleEmailChange}
        label="이메일 입력란"
        autoComplete="email"
      />
      <Input
        id="age"
        type="text"
        placeholder="👤 나이를 입력해주세요"
        value={age}
        isValid={isAgeValid}
        onChange={handleAgeChange}
        label="나이 입력란"
        autoComplete="off"
      />
      <Input
        id="password"
        type="password"
        placeholder="🔒 비밀번호를 입력해주세요"
        value={password}
        isValid={isPasswordValid}
        onChange={handlePasswordChange}
        label="비밀번호 입력란"
        autoComplete="new-password"
      />
      <Input
        id="password-confirm"
        type="password"
        placeholder="🔒 비밀번호를 한번 더 입력해주세요"
        value={passwordConfirm}
        isValid={isPasswordConfirmValid}
        onChange={handlePasswordConfirmChange}
        label="비밀번호 확인 입력란"
        autoComplete="new-password"
      />
      <Button type="submit" disabled={!isSubmitEnabled}>
        회원가입
      </Button>
    </form>
  );
};

export default SignupForm;
