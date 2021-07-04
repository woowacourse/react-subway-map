import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFocus from "../../hooks/useFocus";
import { useInput } from "../@shared/Input/hooks";
import PATH from "../../constants/path";
import { login } from "../../pages/Login/slice";
import Button from "../@shared/Button";
import Input from "../@shared/Input";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, handleEmailChange] = useInput(null);
  const [password, handlePasswordChange] = useInput(null);
  const ref = useFocus([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(login({ email, password }));
  };

  return (
    <form className="flex flex-col px-8 space-y-8" onSubmit={handleSubmit}>
      <Input
        id="email"
        type="email"
        ref={ref}
        placeholder="✉️ 이메일을 입력해주세요"
        value={email}
        onChange={handleEmailChange}
        label="이메일 입력란"
        isValid
        autoComplete="email"
      />
      <Input
        id="password"
        type="password"
        placeholder="🔒 비밀번호를 입력해주세요"
        value={password}
        onChange={handlePasswordChange}
        label="비밀번호 입력란"
        isValid
        autoComplete="current-password"
      />
      <Button type="submit" disabled={false}>
        로그인
      </Button>
      <Link to={PATH.SIGNUP} className="mt-8 text-center text-gray-700">
        <span>아직 회원이 아니신가요?</span>
      </Link>
    </form>
  );
};

export default LoginForm;
