import { fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import { useAppDispatch } from "../../hooks";

import LoginPage from "./LoginPage";

import initialState from "../../fixtures/redux";
import mockStore from "../../utils/mockStore";

const mockedUseAppDispatch = useAppDispatch as jest.MockedFunction<
  typeof useAppDispatch
>;

const store = mockStore(initialState);

beforeEach(() => {
  mockedUseAppDispatch.mockImplementation(() => store.dispatch);
});

afterEach(() => {
  store.clearActions();
});

describe("로그인 페이지 테스트", () => {
  describe("사용자가 유효한 비밀번호(4글자 이상 20글자 이하의 길이)를 입력한 상황에서", () => {
    describe("사용자가 입력한 이메일이 30글자이하의 유효한 형식인 경우", () => {
      it("로그인 버튼 클릭시 로그인 요청이 발생한다.", async () => {
        const { getByPlaceholderText, getByRole } = render(
          <Provider store={store}>
            <MemoryRouter>
              <LoginPage />
            </MemoryRouter>
          </Provider>
        );

        fireEvent.change(getByPlaceholderText(/이메일/i), {
          target: { value: "test@test.com" },
        });

        fireEvent.change(getByPlaceholderText(/비밀번호/i), {
          target: { value: "1".repeat(6) },
        });

        fireEvent.click(
          getByRole("button", {
            name: /확인/i,
          })
        );

        await waitFor(() => {
          const [action1, action2] = store.getActions();
          expect(action1).toMatchObject({ type: "[AUTH] LOGIN/pending" });
          expect(action2).toMatchObject({ type: "[AUTH] LOGIN/fulfilled" });
        });
      });
    });

    describe("사용자가 입력한 이메일이 유효하지 않은 형식인 경우", () => {
      it("로그인 버튼 클릭시 로그인 요청이 발생하지 않는다.", async () => {
        const { getByPlaceholderText, getByRole } = render(
          <Provider store={store}>
            <MemoryRouter>
              <LoginPage />
            </MemoryRouter>
          </Provider>
        );

        fireEvent.change(getByPlaceholderText(/이메일/i), {
          target: { value: "t".repeat(4) },
        });

        fireEvent.change(getByPlaceholderText(/비밀번호/i), {
          target: { value: "1".repeat(6) },
        });

        fireEvent.click(
          getByRole("button", {
            name: /확인/i,
          })
        );

        await waitFor(() => {
          const actions = store.getActions();
          expect(actions).toEqual([]);
        });
      });
    });

    describe("사용자가 입력한 이메일이 30글자를 초과한 경우", () => {
      it("로그인 버튼 클릭시 로그인 요청이 발생하지 않는다.", async () => {
        const { getByPlaceholderText, getByRole } = render(
          <Provider store={store}>
            <MemoryRouter>
              <LoginPage />
            </MemoryRouter>
          </Provider>
        );

        fireEvent.change(getByPlaceholderText(/이메일/i), {
          target: { value: "t".repeat(21) + "@test1.com" }, // length: 21 + 10 = 31
        });

        fireEvent.change(getByPlaceholderText(/비밀번호/i), {
          target: { value: "1".repeat(6) },
        });

        fireEvent.click(
          getByRole("button", {
            name: /확인/i,
          })
        );

        await waitFor(() => {
          const actions = store.getActions();
          expect(actions).toEqual([]);
        });
      });
    });
  });

  describe("사용자가 유효한 이메일(30글자이하의 유효한 형식)을 입력한 상황에서", () => {
    describe("사용자가 입력한 비밀번호가 4글자 미만인 경우 ", () => {
      it("로그인 버튼 클릭시 로그인 요청이 발생하지 않는다.", async () => {
        const { getByPlaceholderText, getByRole } = render(
          <Provider store={store}>
            <MemoryRouter>
              <LoginPage />
            </MemoryRouter>
          </Provider>
        );

        fireEvent.change(getByPlaceholderText(/이메일/i), {
          target: { value: "test@test.com" },
        });

        fireEvent.change(getByPlaceholderText(/비밀번호/i), {
          target: { value: "1".repeat(3) },
        });

        fireEvent.click(
          getByRole("button", {
            name: /확인/i,
          })
        );

        await waitFor(() => {
          const actions = store.getActions();
          expect(actions).toEqual([]);
        });
      });
    });

    describe("사용자가 입력한 비밀번호가 20글자 초과인 경우 ", () => {
      it("로그인 버튼 클릭시 로그인 요청이 발생하지 않는다.", async () => {
        const { getByPlaceholderText, getByRole } = render(
          <Provider store={store}>
            <MemoryRouter>
              <LoginPage />
            </MemoryRouter>
          </Provider>
        );

        fireEvent.change(getByPlaceholderText(/이메일/i), {
          target: { value: "test@test.com" },
        });

        fireEvent.change(getByPlaceholderText(/비밀번호/i), {
          target: { value: "1".repeat(21) },
        });

        fireEvent.click(
          getByRole("button", {
            name: /확인/i,
          })
        );

        await waitFor(() => {
          const actions = store.getActions();
          expect(actions).toEqual([]);
        });
      });
    });
  });
});
