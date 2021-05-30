import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { login } from "./slice";
import Login from ".";

const mockDispatch = jest.fn();
const mockSelector = jest.fn();
const mockHistoryPush = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));

describe("Login", () => {
  test("올바른 이메일과 비밀번호를 입력하면 로컬 스토리지에 엑세스토큰이 생성 날짜와 함께 생성된다.", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    jest.mock("react-router-dom", () => ({
      useHistory: () => ({
        push: mockHistoryPush,
      }),
    }));

    const localStorageSetItemSpy = jest.spyOn(Storage.prototype, "setItem");

    const email = "testId@woowa.com";
    const password = "1234";

    const { type, payload: accessToken } = await login({ email, password })(
      mockDispatch
    );

    const emailInput = screen.getByRole("textbox");
    const passwordInput =
      screen.getByPlaceholderText(/🔒 비밀번호를 입력해주세요/i);
    const loginButton = screen.getByRole("button", { name: /로그인/i });

    fireEvent.change(emailInput, { arget: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    fireEvent.click(loginButton);

    expect(mockDispatch).toBeCalled();
    expect(mockDispatch).toBeCalledWith(expect.objectContaining({ type }));
    expect(localStorageSetItemSpy).toBeCalled();

    const { createdAt, accessToken: savedAccessToken } = JSON.parse(
      localStorage.getItem("accessToken")
    );
    expect(typeof createdAt).toBe(typeof Date.now());

    expect(savedAccessToken).toBe(accessToken);
  });
});
