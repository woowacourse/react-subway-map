/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Signup from ".";
import { signup } from "./slice";

const mockDispatch = jest.fn();
const mockSelector = jest.fn();
const mockHistoryPush = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("Signup", () => {
  test("올바른 정보를 기입하고 회원가입 버튼을 누르면 회원가입 요청을 보낼 수 있어야 한다.", async () => {
    render(<Signup />);

    const email = "testId@woowa.com";
    const age = "20";
    const password = "1234";
    const passwordConfirm = "1234";

    const { type } = await signup({ email, age, password })(mockDispatch);

    const emailInput = screen.getByPlaceholderText(/✉️ 이메일을 입력해주세요/i);
    const ageInput = screen.getByPlaceholderText(/👤 나이를 입력해주세요/i);
    const passwordInput =
      screen.getByPlaceholderText(/🔒 비밀번호를 입력해주세요/i);
    const passwordConfirmInput =
      screen.getByPlaceholderText(/🔒 비밀번호를 한번 더 입력해주세요/i);
    const signupButton = screen.getByRole("button", { name: /회원가입/i });

    fireEvent.change(emailInput, {
      target: { value: email },
    });
    fireEvent.change(ageInput, { target: { value: age } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(passwordConfirmInput, {
      target: { value: passwordConfirm },
    });

    fireEvent.click(signupButton);

    expect(mockDispatch).toBeCalled();
    expect(mockDispatch).toBeCalledWith(expect.objectContaining({ type }));
  });
});
