import { TEST_ID } from "../../@test/testId";
import { LoginInfo } from "../../@types/types";
import { INPUT_PLACEHOLDER } from "../../constants/placeholder";

const tryLogin = (loginInfo: LoginInfo) => {
  cy.findByPlaceholderText(INPUT_PLACEHOLDER.EMAIL).type(loginInfo.email);
  cy.findByPlaceholderText(INPUT_PLACEHOLDER.PASSWORD).type(loginInfo.password);
  cy.findByTestId(TEST_ID.LOGIN_BUTTON).click();
};

describe("로그인", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.clearLocalStorage();
    cy.intercept("POST", "/login/token").as("login");
  });

  describe("유효성 검사", () => {
    it("모든 유효성 검사를 통과한다면 로그인 요청을 보낼 수 있다", () => {
      cy.fixture("user").then(({ registeredUser }) => {
        tryLogin(registeredUser);
      });

      cy.get("@login").should("exist");
    });

    it("이메일 전체 글자 수가 30글자를 넘는다면 로그인을 할 수 없다", () => {
      cy.fixture("user").then(({ registeredUser }) => {
        tryLogin({ ...registeredUser, email: "testtesttesttesttesttesttesttesttesttesttesttest@naver.com" });
      });

      cy.get("@login").should("not.exist");
    });

    it("비밀번호가 4글자 미만이라면 로그인을 할 수 없다", () => {
      cy.fixture("user").then(({ registeredUser }) => {
        tryLogin({ ...registeredUser, password: "123" });
      });

      cy.get("@login").should("not.exist");
    });

    it("비밀번호가 20글자보다 많다면 로그인을 할 수 없다", () => {
      cy.fixture("user").then(({ registeredUser }) => {
        tryLogin({ ...registeredUser, password: "123456789123456789123456789" });
      });

      cy.get("@login").should("not.exist");
    });
  });

  describe("로그인 실패 / 성공", () => {
    it("회원가입이 된 유저는 로그인 시 Station 페이지로 이동한다.", () => {
      cy.fixture("user").then(({ registeredUser }) => {
        tryLogin(registeredUser);
      });

      cy.get("@login").then((res) => {
        expect(res.response.statusCode).equal(200);
      });

      cy.findByTestId(TEST_ID.STATION_PAGE).should("exist");
    });

    it("회원가입이 되지 않은 유저는 로그인 할 수 없다", () => {
      cy.fixture("user").then(({ unRegisteredUser }) => {
        tryLogin(unRegisteredUser);
      });

      cy.get("@login").then((res) => {
        expect(res.response.statusCode).equal(401);
      });

      cy.findByTestId(TEST_ID.STATION_PAGE).should("not.exist");
    });
  });

  describe("페이지 이동", () => {
    it("로그인 하기 전에 회원가입 페이지를 제외한 다른 페이지에 접근할 수 없다.", () => {
      cy.visit("/station");
      cy.findByTestId(TEST_ID.STATION_PAGE).should("not.exist");
    });

    it("로그인 하기 전에 회원가입 페이지에 접근할 수 있다.", () => {
      cy.findByTestId(TEST_ID.MOVE_TO_SIGN_UP_BUTTON).click();
      cy.findByTestId(TEST_ID.SIGNUP_PAGE).should("exist");
    });
  });
});
