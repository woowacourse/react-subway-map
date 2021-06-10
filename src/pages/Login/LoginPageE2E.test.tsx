import { render, fireEvent, act, cleanup, waitFor, screen } from "@testing-library/react";
import { createMemoryHistory, MemoryHistory } from "history";

import { INPUT_PLACEHOLDER } from "../../constants/placeholder";
import { TEST_USER } from "../../fixtures/user";
import { TEST_ID } from "../../@test/testId";
import { MockedApp } from "../../@test/mockApp";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { BASE_URL, DEFAULT_API_PROVIDER } from "../../apis";

import { requestAuth } from "../../apis/user";

jest.mock("../../apis/user");

// const server = setupServer(
//   rest.get(`${BASE_URL[DEFAULT_API_PROVIDER]}/members/me`, (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json({
//         data: {
//           id: 0,
//           email: "someEmail@naver.com",
//           age: 0,
//         },
//       })
//     );
//   }),
//   rest.post(`${BASE_URL[DEFAULT_API_PROVIDER]}/login/token`, (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json({
//         data: {
//           accessToken: "testToken",
//         },
//       })
//     );
//   })
// );

// beforeAll(() => {
//   server.listen();
// });

// afterAll(() => {
//   server.close();
// });

// afterEach(() => {
//   server.resetHandlers();
// });

beforeEach(() => {
  cleanup();
  jest.spyOn(window, "alert").mockImplementation(() => true);
});

type LoginInfo = {
  EMAIL: string;
  PASSWORD: string;
};

const renderLoginPage = (history?: MemoryHistory) => {
  const defaultHistory = createMemoryHistory();

  return render(
    <>
      <MockedApp history={history ? history : defaultHistory} />
      <div id="modal"></div>
    </>
  );
};

const tryLogin = async (loginInfo: LoginInfo) => {
  const EmailInput = screen.getByPlaceholderText(INPUT_PLACEHOLDER.EMAIL);
  const PasswordInput = screen.getByPlaceholderText(INPUT_PLACEHOLDER.PASSWORD);
  const loginButton = screen.getByTestId(TEST_ID.LOGIN_BUTTON);

  act(() => {
    fireEvent.change(EmailInput, { target: { value: loginInfo.EMAIL } });
    fireEvent.change(PasswordInput, { target: { value: loginInfo.PASSWORD } });
  });

  act(() => {
    fireEvent.click(loginButton);
  });
};

describe("로그인", () => {
  describe("이메일 유효성 검사", () => {
    describe("1시간 이내에 로그인한적이 없는 이용자가 처음 접속했을 때", () => {
      afterEach(() => {
        cleanup();
      });

      it("진입하게 되는 페이지는 로그인 페이지이다", async () => {
        const history = createMemoryHistory();

        const { findByTestId } = renderLoginPage(history);

        const loginPage = await findByTestId(TEST_ID.LOGIN_PAGE);

        expect(loginPage);
      });
    });

    describe("모든 유효성이 통과한다면", () => {
      afterEach(() => {
        cleanup();
      });

      it("로그인을 할 수 있다.", async () => {
        const mockedRequestLogin = requestAuth.login as jest.MockedFunction<typeof requestAuth.login>;
        mockedRequestLogin.mockResolvedValue("testToken");

        Object.defineProperty(window, "localStorage", {
          value: {
            getItem: jest.fn(() => null),
            setItem: jest.fn(() => null),
          },
          writable: true,
        });

        renderLoginPage();

        tryLogin(TEST_USER);

        await waitFor(() => {
          expect(window.localStorage.setItem).toBeCalledWith("accessToken", "testToken");
        });

        await waitFor(async () => {
          expect(screen.getByTestId(TEST_ID.STATION_PAGE)).toBeInTheDocument();
        });
      });
    });
    describe("이메일 형식이 올바르지 않다면", () => {
      afterEach(() => {
        cleanup();
      });

      it("로그인을 할 수 없다.", async () => {
        Object.defineProperty(window, "localStorage", {
          value: {
            getItem: jest.fn(() => null),
            setItem: jest.fn(() => null),
          },
          writable: true,
        });

        renderLoginPage();

        expect(screen.getByTestId(TEST_ID.LOGIN_PAGE)).toBeInTheDocument();

        tryLogin({ ...TEST_USER, EMAIL: "wrongEmail" });

        await waitFor(() => {
          expect(screen.getByText(/유효한 이메일 형식이 아닙니다/i)).toBeInTheDocument();
        });

        // await waitFor(() => {
        //   expect(screen.getByTestId(TEST_ID.LOGIN_PAGE)).toBeInTheDocument();
        // });
      });
    });

    describe("이메일 전체 글자 수가 30글자를 넘는다면", () => {
      it("로그인을 할 수 없다.", () => {});
    });
  });
  describe("비밀번호 유효성 검사", () => {
    describe("비밀번호가 4글자 미만이라면", () => {
      it("로그인을 할 수 없다.", () => {});
    });

    describe("비밀번호가 20글자보다 많다면", () => {
      it("로그인을 할 수 없다.", () => {});
    });
  });
});
