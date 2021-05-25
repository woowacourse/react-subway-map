import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PATH from "../../constants/path";
import STATUS from "../../constants/status";
import Main from "../../components/@shared/Main";
import Button from "../../components/@shared/Button";
import Input from "../../components/@shared/Input";
import Loading from "../../components/@shared/Loading";
import { useInput } from "../../components/@shared/Input/hooks";
import { useSignupAge, useSignupEmail, useSignupPassword } from "./hooks";
import { signup, reset } from "./slice";

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.signup);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(signup({ email, password, age }));
  };

  useEffect(() => {
    if (status === STATUS.SUCCEED) {
      alert(message);
      dispatch(reset());
      history.push(PATH.LOGIN);
    }

    if (status === STATUS.FAILED) {
      alert(message);
      dispatch(reset());
    }
  }, [status, message, dispatch, history]);

  return (
    <>
      <Loading isLoading={status === STATUS.LOADING} />
      <Main>
        <section className="m-auto pb-8 w-120 border-t-8 border-yellow-300 rounded-sm shadow-md">
          <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
            회원가입
          </h2>
          <form
            className="flex flex-col px-8 space-y-8"
            onSubmit={handleSubmit}
          >
            <label className="sr-only" htmlFor="email">
              이메일 입력란
            </label>
            <Input
              id="email"
              type="email"
              placeholder="✉️ 이메일을 입력해주세요"
              value={email}
              isValid={isEmailValid}
              onChange={handleEmailChange}
            />
            <label className="sr-only" htmlFor="age">
              나이 입력란
            </label>
            <Input
              id="age"
              type="text"
              placeholder="👤 나이를 입력해주세요"
              value={age}
              isValid={isAgeValid}
              onChange={handleAgeChange}
            />
            <label className="sr-only" htmlFor="password">
              비밀번호 입력란
            </label>
            <Input
              id="password"
              type="password"
              placeholder="🔒 비밀번호를 입력해주세요"
              value={password}
              isValid={isPasswordValid}
              onChange={handlePasswordChange}
            />
            <label className="sr-only" htmlFor="password-confirm">
              비밀번호 확인 입력란
            </label>
            <Input
              id="password-confirm"
              type="password"
              placeholder="🔒 비밀번호를 한번 더 입력해주세요"
              value={passwordConfirm}
              isValid={isPasswordConfirmValid}
              onChange={handlePasswordConfirmChange}
            />
            <Button type="submit" disabled={!isSubmitEnabled}>
              회원가입
            </Button>
          </form>
        </section>
      </Main>
    </>
  );
};

export default Signup;
